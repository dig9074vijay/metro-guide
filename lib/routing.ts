import {
  GraphEdge,
  MetroLine,
  RouteResult,
  RouteSegment,
  RouteStep,
  RouteStrategy,
} from "./metro-types";
import { getAllLines, normalizeStationName } from "./metro-data";

// Node key: "STATION_NAME|LINE_CODE"
type NodeKey = string;

function nodeKey(station: string, lineCode: string): NodeKey {
  return `${normalizeStationName(station)}|${lineCode}`;
}

function parseNodeKey(key: NodeKey): { station: string; lineCode: string } {
  const idx = key.lastIndexOf("|");
  return { station: key.slice(0, idx), lineCode: key.slice(idx + 1) };
}

interface Graph {
  adjacency: Map<NodeKey, GraphEdge[]>;
  // Maps normalized station name → list of line codes that serve it
  stationToLines: Map<string, string[]>;
}

let _graph: Graph | null = null;

function buildGraph(): Graph {
  const adjacency = new Map<NodeKey, GraphEdge[]>();
  const stationToLines = new Map<string, string[]>();

  const allLines: MetroLine[] = getAllLines();

  const addEdge = (from: NodeKey, to: NodeKey, weight: number, isInterchange: boolean) => {
    if (!adjacency.has(from)) adjacency.set(from, []);
    adjacency.get(from)!.push({ to, weight, isInterchange });
  };

  // Step 1: build sequential edges within each line
  for (const { line, stations } of allLines) {
    for (let i = 0; i < stations.length; i++) {
      const name = normalizeStationName(stations[i].station_name);
      const key = nodeKey(name, line.line_code);

      // Track which lines serve this station
      if (!stationToLines.has(name)) stationToLines.set(name, []);
      stationToLines.get(name)!.push(line.line_code);

      if (!adjacency.has(key)) adjacency.set(key, []);

      if (i + 1 < stations.length) {
        const nextName = normalizeStationName(stations[i + 1].station_name);
        const nextKey = nodeKey(nextName, line.line_code);
        addEdge(key, nextKey, 1, false);
        addEdge(nextKey, key, 1, false);
      }
    }
  }

  // Step 2: add interchange edges between lines at the same physical station
  for (const [stationName, lineCodes] of stationToLines) {
    if (lineCodes.length < 2) continue;
    for (let a = 0; a < lineCodes.length; a++) {
      for (let b = 0; b < lineCodes.length; b++) {
        if (a === b) continue;
        const from = nodeKey(stationName, lineCodes[a]);
        const to = nodeKey(stationName, lineCodes[b]);
        addEdge(from, to, 1, true);
      }
    }
  }

  return { adjacency, stationToLines };
}

function getGraph(): Graph {
  if (!_graph) _graph = buildGraph();
  return _graph;
}

// Dijkstra with two strategies:
// - "shortest": every edge weight = 1
// - "min-interchange": interchange edges have high penalty (100)
function dijkstra(
  startStation: string,
  endStation: string,
  strategy: RouteStrategy
): NodeKey[] | null {
  const { adjacency, stationToLines } = getGraph();

  const srcNorm = normalizeStationName(startStation);
  const dstNorm = normalizeStationName(endStation);

  const srcLines = stationToLines.get(srcNorm);
  const dstLines = stationToLines.get(dstNorm);

  if (!srcLines || !dstLines) return null;

  const INTERCHANGE_PENALTY = strategy === "min-interchange" ? 200 : 1;

  const dist = new Map<NodeKey, number>();
  const prev = new Map<NodeKey, NodeKey | null>();
  // Min-heap: [distance, nodeKey]
  const heap: [number, NodeKey][] = [];

  const push = (d: number, key: NodeKey) => {
    heap.push([d, key]);
    // Bubble up
    let i = heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (heap[parent][0] > heap[i][0]) {
        [heap[parent], heap[i]] = [heap[i], heap[parent]];
        i = parent;
      } else break;
    }
  };

  const pop = (): [number, NodeKey] | undefined => {
    if (heap.length === 0) return undefined;
    const top = heap[0];
    const last = heap.pop()!;
    if (heap.length > 0) {
      heap[0] = last;
      // Bubble down
      let i = 0;
      while (true) {
        let smallest = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        if (l < heap.length && heap[l][0] < heap[smallest][0]) smallest = l;
        if (r < heap.length && heap[r][0] < heap[smallest][0]) smallest = r;
        if (smallest !== i) {
          [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
          i = smallest;
        } else break;
      }
    }
    return top;
  };

  // Initialize sources
  for (const lc of srcLines) {
    const key = nodeKey(srcNorm, lc);
    dist.set(key, 0);
    prev.set(key, null);
    push(0, key);
  }

  const destSet = new Set<NodeKey>(dstLines.map((lc) => nodeKey(dstNorm, lc)));
  let foundDest: NodeKey | null = null;

  while (heap.length > 0) {
    const item = pop();
    if (!item) break;
    const [d, u] = item;

    if (destSet.has(u)) {
      foundDest = u;
      break;
    }

    if ((dist.get(u) ?? Infinity) < d) continue;

    for (const edge of adjacency.get(u) ?? []) {
      const w = edge.isInterchange ? INTERCHANGE_PENALTY : 1;
      const nd = d + w;
      if (nd < (dist.get(edge.to) ?? Infinity)) {
        dist.set(edge.to, nd);
        prev.set(edge.to, u);
        push(nd, edge.to);
      }
    }
  }

  if (!foundDest) return null;

  // Reconstruct path
  const path: NodeKey[] = [];
  let cur: NodeKey | null = foundDest;
  while (cur !== null) {
    path.unshift(cur);
    cur = prev.get(cur) ?? null;
  }
  return path;
}

function pathToRoute(path: NodeKey[], strategy: RouteStrategy): RouteResult {
  const allLines = getAllLines();
  const lineMap = new Map(allLines.map((ml) => [ml.line.line_code, ml]));

  const segments: RouteSegment[] = [];
  let currentSegment: RouteSegment | null = null;
  let totalInterchanges = 0;

  for (let i = 0; i < path.length; i++) {
    const { station, lineCode } = parseNodeKey(path[i]);
    const ml = lineMap.get(lineCode)!;
    const stationObj = ml.stations.find(
      (s) => normalizeStationName(s.station_name) === station
    );

    const isInterchangeNode =
      i > 0 && parseNodeKey(path[i - 1]).lineCode !== lineCode;

    if (!currentSegment || parseNodeKey(path[i - 1] ?? path[i]).lineCode !== lineCode) {
      // Determine direction for this segment
      const segStations = path
        .slice(i)
        .map((k) => parseNodeKey(k))
        .filter((n) => n.lineCode === lineCode);
      
      // Find first and last station indices on the line
      const lineStations = ml.stations;
      const firstIdx = lineStations.findIndex(
        (s) => normalizeStationName(s.station_name) === station
      );
      const lastSegStation = segStations[segStations.length - 1].station;
      const lastIdx = lineStations.findIndex(
        (s) => normalizeStationName(s.station_name) === lastSegStation
      );
      // Use the actual terminus names from the array (array may be in reverse order vs lines.json)
      const direction =
        lastIdx >= firstIdx
          ? `towards ${lineStations[lineStations.length - 1].station_name}`
          : `towards ${lineStations[0].station_name}`;

      if (currentSegment) {
        segments.push(currentSegment);
        totalInterchanges++;
      }

      currentSegment = {
        lineCode,
        lineName: ml.line.line_color,
        lineColor: ml.line.line_code,
        primaryColor: ml.line.primary_color_code,
        direction,
        stations: [],
      };
    }

    const action: RouteStep["action"] =
      i === 0
        ? "board"
        : i === path.length - 1
        ? "arrive"
        : isInterchangeNode
        ? "interchange"
        : "travel";

    const step: RouteStep = {
      stationName: station,
      stationCode: stationObj?.station_code ?? "",
      lineCode,
      lineName: ml.line.line_color,
      lineColor: ml.line.line_code,
      primaryColor: ml.line.primary_color_code,
      isInterchange: stationObj?.interchange ?? false,
      action,
      direction: currentSegment!.direction,
    };

    currentSegment!.stations.push(step);
  }

  if (currentSegment) segments.push(currentSegment);

  const totalStations = path.length - 1; // edges traversed
  const estimatedMinutes = Math.round(totalStations * 2 + totalInterchanges * 5);
  const fareEstimate = calcFare(totalStations);

  return {
    segments,
    totalStations,
    totalInterchanges,
    estimatedMinutes,
    fareEstimate,
    strategy,
  };
}

function calcFare(stations: number): string {
  // Delhi Metro fare structure (approximate)
  if (stations <= 2) return "₹10";
  if (stations <= 5) return "₹20";
  if (stations <= 12) return "₹30";
  if (stations <= 21) return "₹40";
  if (stations <= 32) return "₹50";
  return "₹60";
}

export function findRoute(
  source: string,
  destination: string,
  strategy: RouteStrategy
): RouteResult | null {
  if (normalizeStationName(source) === normalizeStationName(destination)) {
    return null;
  }

  const path = dijkstra(source, destination, strategy);
  if (!path || path.length === 0) return null;

  return pathToRoute(path, strategy);
}

export function stationExists(name: string): boolean {
  const { stationToLines } = getGraph();
  return stationToLines.has(normalizeStationName(name));
}

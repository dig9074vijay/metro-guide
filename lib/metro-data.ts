import { LineData, MetroLine, StationData } from "./metro-types";

// Static imports of all line JSON files
import linesData from "@/data/lines.json";
import yellowlineData from "@/data/yellowline.json";
import redlineData from "@/data/redline.json";
import bluelineData from "@/data/blueline.json";
import blueline1Data from "@/data/blueline-1.json";
import greenlineData from "@/data/greenline.json";
import violetlineData from "@/data/violetline.json";
import pinklineData from "@/data/pinkline.json";
import pinkextensionData from "@/data/pinkextension.json";
import magentaextensionData from "@/data/magentaextension.json";
import magentalineData from "@/data/magentaline.json";
import greylineData from "@/data/greyline.json";
import airportexpressData from "@/data/airportexpress.json";
import rapidmetroData from "@/data/rapidmetro.json";

// Map file data to line codes
const LINE_STATIONS_MAP: Record<string, StationData[]> = {
  LN1: redlineData as StationData[],
  LN2: yellowlineData as StationData[],
  LN3: bluelineData as StationData[],
  LN4: blueline1Data as StationData[],
  LN5: greenlineData as StationData[],
  LN6: violetlineData as StationData[],
  LN7: pinklineData as StationData[],
  LN7EXTN: pinkextensionData as StationData[],
  LN8: magentalineData as StationData[],
  LN8EXTN: magentaextensionData as StationData[],
  LN9: greylineData as StationData[],
  LN10: airportexpressData as StationData[],
  LN11: rapidmetroData as StationData[],
};

let _allLines: MetroLine[] | null = null;

export function getAllLines(): MetroLine[] {
  if (_allLines) return _allLines;

  const lines = linesData as LineData[];
  _allLines = lines
    .filter((l) => l.show_in_frontend)
    .map((line) => ({
      line,
      stations: LINE_STATIONS_MAP[line.line_code] ?? [],
    }))
    .filter((ml) => ml.stations.length > 0);

  return _allLines;
}

let _allStationNames: string[] | null = null;

export function getAllStationNames(): string[] {
  if (_allStationNames) return _allStationNames;

  const seen = new Set<string>();
  for (const { stations } of getAllLines()) {
    for (const s of stations) {
      seen.add(normalizeStationName(s.station_name));
    }
  }
  _allStationNames = Array.from(seen).sort();
  return _allStationNames;
}

export function normalizeStationName(name: string): string {
  return name.trim().toUpperCase();
}

export function getLineByCode(code: string): MetroLine | undefined {
  return getAllLines().find((ml) => ml.line.line_code === code);
}

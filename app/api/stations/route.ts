import { NextRequest, NextResponse } from "next/server";
import { getAllStationNames, STATION_ALIASES } from "@/lib/metro-data";

/** Standard Levenshtein edit distance */
function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[] = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const temp = dp[j];
      dp[j] =
        a[i - 1] === b[j - 1]
          ? prev
          : 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = temp;
    }
  }
  return dp[n];
}

/**
 * Score how well a station name matches a query.
 * Higher = better match. Returns -1 if no match.
 */
function scoreStation(name: string, q: string): number {
  if (name === q) return 1000;
  if (name.startsWith(q)) return 900;
  if (name.includes(q)) return 800;

  const words = name.split(/[\s\-–,()]+/).filter(Boolean);

  // Exact word match
  if (words.some((w) => w === q)) return 750;
  // Word starts with query
  if (words.some((w) => w.startsWith(q))) return 700;

  // Fuzzy: allow 1 error per 4 chars in the query (minimum 1)
  const threshold = Math.max(1, Math.floor(q.length / 4));

  // Fuzzy word-level: compare query against each word prefix
  for (const word of words) {
    const sub = word.slice(0, q.length + threshold);
    if (levenshtein(sub, q) <= threshold) return 600;
  }

  // Fuzzy full-prefix: compare query against the station name prefix
  if (q.length >= 3) {
    const prefix = name.slice(0, q.length + threshold);
    if (levenshtein(prefix, q) <= threshold) return 500;
  }

  return -1;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim().toUpperCase();

  const all = getAllStationNames();

  if (!q) return NextResponse.json(all.slice(0, 10));

  // Resolve aliases: if the query matches an old name, inject the current name
  const aliasInjections = new Set<string>();
  for (const [oldName, currentName] of Object.entries(STATION_ALIASES)) {
    if (scoreStation(oldName, q) >= 0 && all.includes(currentName)) {
      aliasInjections.add(currentName);
    }
  }

  // Score all canonical station names
  const scored = all
    .map((name) => ({ name, score: scoreStation(name, q) }))
    .filter(({ score }) => score >= 0)
    .sort((a, b) => b.score - a.score);

  // Merge: alias injections first (they matched an old name), then fuzzy matches
  const result = new Map<string, number>();
  for (const name of aliasInjections) {
    result.set(name, 850); // between substring and exact-start scores
  }
  for (const { name, score } of scored) {
    if (!result.has(name)) result.set(name, score);
  }

  const sorted = Array.from(result.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name]) => name);

  return NextResponse.json(sorted);
}

import { NextRequest, NextResponse } from "next/server";
import { getAllStationNames } from "@/lib/metro-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").trim().toUpperCase();

  const all = getAllStationNames();
  const filtered = q
    ? all.filter((name) => name.includes(q)).slice(0, 10)
    : all.slice(0, 10);

  return NextResponse.json(filtered);
}

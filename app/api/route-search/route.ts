import { NextRequest, NextResponse } from "next/server";
import { findRoute, stationExists } from "@/lib/routing";
import { RouteStrategy } from "@/lib/metro-types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { source, destination, strategy = "shortest" } = body as {
      source: string;
      destination: string;
      strategy: RouteStrategy;
    };

    if (!source || !destination) {
      return NextResponse.json(
        { error: "Source and destination are required." },
        { status: 400 }
      );
    }

    if (!stationExists(source)) {
      return NextResponse.json(
        { error: `Station "${source}" not found.` },
        { status: 404 }
      );
    }

    if (!stationExists(destination)) {
      return NextResponse.json(
        { error: `Station "${destination}" not found.` },
        { status: 404 }
      );
    }

    const result = findRoute(source, destination, strategy);

    if (!result) {
      return NextResponse.json(
        { error: "No route found between the selected stations." },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

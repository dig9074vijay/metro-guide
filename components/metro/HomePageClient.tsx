"use client";

import { useState } from "react";
import { RouteResult, RouteStrategy } from "@/lib/metro-types";
import { StationAutocomplete } from "@/components/metro/StationAutocomplete";
import { RouteTimeline } from "@/components/metro/RouteTimeline";
import { RouteSummaryCard } from "@/components/metro/RouteSummaryCard";

const LINE_LEGEND = [
  { name: "Red Line", color: "#c0282c" },
  { name: "Yellow Line", color: "#f6d71a" },
  { name: "Blue Line", color: "#3b76c0" },
  { name: "Green Line", color: "#54ab55" },
  { name: "Violet Line", color: "#8115ff" },
  { name: "Pink Line", color: "#ed91c9" },
  { name: "Magenta Line", color: "#f300f3" },
  { name: "Grey Line", color: "#808080" },
  { name: "Orange Line", color: "#f46808" },
  { name: "Rapid Metro", color: "#015b97" },
];

export default function HomePageClient() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [strategy, setStrategy] = useState<RouteStrategy>("shortest");
  const [loading, setLoading] = useState(false);
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSwap = () => {
    const tmp = source;
    setSource(destination);
    setDestination(tmp);
    setRoute(null);
    setError(null);
  };

  const handleSearch = async () => {
    if (!source.trim() || !destination.trim()) return;
    setLoading(true);
    setError(null);
    setRoute(null);
    try {
      const res = await fetch("/api/route-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: source.trim().toUpperCase(),
          destination: destination.trim().toUpperCase(),
          strategy,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else {
        setRoute(data);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] dark:bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-b border-neutral-100 dark:border-neutral-800">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🚇</span>
            <span className="text-base font-bold text-neutral-900 dark:text-white tracking-tight">
              Delhi Metro Guide
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 font-medium hidden sm:block uppercase tracking-widest">
            DMRC
          </span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {/* Hero text */}
        <div className="pt-2">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Find your route
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Enter source and destination to get step-by-step directions
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-5 space-y-3">
          {/* Source */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold flex-shrink-0 shadow-sm">
              A
            </div>
            <StationAutocomplete
              value={source}
              onChange={setSource}
              placeholder="From station…"
            />
          </div>

          {/* Swap */}
          <div className="flex justify-center">
            <button
              onClick={handleSwap}
              aria-label="Swap stations"
              className="p-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-400 hover:text-blue-600 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </button>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 text-white text-xs font-bold flex-shrink-0 shadow-sm">
              B
            </div>
            <StationAutocomplete
              value={destination}
              onChange={setDestination}
              placeholder="To station…"
            />
          </div>

          {/* Strategy selector */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setStrategy("shortest")}
              className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all border ${
                strategy === "shortest"
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              ⚡ Fastest Route
            </button>
            <button
              onClick={() => setStrategy("min-interchange")}
              className={`flex-1 h-10 rounded-xl text-sm font-semibold transition-all border ${
                strategy === "min-interchange"
                  ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                  : "bg-neutral-50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
              }`}
            >
              🔄 Min Interchanges
            </button>
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            disabled={loading || !source.trim() || !destination.trim()}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all shadow-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Finding route…
              </span>
            ) : (
              "Search Route"
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl px-4 py-3">
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              {error}
            </p>
          </div>
        )}

        {/* Route Result */}
        {route && (
          <div className="animate-result-in bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
            {/* Result header */}
            <div className="px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-neutral-900 dark:text-white">
                  Route
                </h2>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    route.strategy === "shortest"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {route.strategy === "shortest"
                    ? "⚡ Fastest"
                    : "🔄 Min Interchange"}
                </span>
              </div>
              <RouteSummaryCard route={route} />
            </div>

            {/* Timeline */}
            <div className="px-5 py-4">
              <RouteTimeline route={route} />
            </div>
          </div>
        )}

        {/* Line Legend */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
            Metro Lines
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {LINE_LEGEND.map((l) => (
              <div key={l.name} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: l.color }}
                />
                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                  {l.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-neutral-400 pb-6">
          Fare estimates are approximate. Allow ~2 min/stop + 5 min per interchange.
        </p>
      </main>
    </div>
  );
}

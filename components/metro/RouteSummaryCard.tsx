import { RouteResult } from "@/lib/metro-types";

interface RouteSummaryCardProps {
  route: RouteResult;
}

export function RouteSummaryCard({ route }: RouteSummaryCardProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
          {route.estimatedMinutes}
        </span>
        <span className="text-[11px] text-blue-500/80 mt-0.5 font-medium">
          min
        </span>
      </div>
      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
        <span className="text-xl font-bold text-neutral-800 dark:text-white">
          {route.totalStations}
        </span>
        <span className="text-[11px] text-neutral-500 mt-0.5 font-medium">
          stops
        </span>
      </div>
      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900">
        <span className="text-xl font-bold text-green-600 dark:text-green-400">
          {route.fareEstimate}
        </span>
        <span className="text-[11px] text-green-500/80 mt-0.5 font-medium">
          fare
        </span>
      </div>
      {route.totalInterchanges > 0 && (
        <div className="col-span-3 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
          <span className="text-amber-600 dark:text-amber-400 text-sm font-semibold">
            {route.totalInterchanges} interchange
            {route.totalInterchanges > 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  );
}

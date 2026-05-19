import { RouteResult } from "@/lib/metro-types";
import { LineBadge, LineColorDot } from "./LineBadge";

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
  );
}

interface RouteTimelineProps {
  route: RouteResult;
}

export function RouteTimeline({ route }: RouteTimelineProps) {
  return (
    <div className="flex flex-col gap-0">
      {route.segments.map((segment, segIdx) => {
        const isLast = segIdx === route.segments.length - 1;
        return (
          <div key={`${segment.lineCode}-${segIdx}`}>
            {/* Segment header */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl mb-1">
              <LineBadge
                lineName={segment.lineName}
                primaryColor={segment.primaryColor}
              />
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                {segment.direction}
              </span>
            </div>

            {/* Station list */}
            <div className="relative pl-8 ml-4">
              {segment.stations.map((step, stepIdx) => {
                const isFirstStop = stepIdx === 0;
                const isLastStop = stepIdx === segment.stations.length - 1;
                const isInterchangeStep = isLastStop && !isLast;

                return (
                  <div
                    key={`${step.stationName}-${stepIdx}`}
                    className="relative flex items-start gap-3 group"
                  >
                    {/* Vertical line */}
                    {!isLastStop && (
                      <div
                        className="absolute left-[-19px] top-[18px] w-0.5 h-full"
                        style={{ backgroundColor: segment.primaryColor + "66" }}
                      />
                    )}

                    {/* Node dot */}
                    <div
                      className="absolute left-[-24px] top-[10px] flex items-center justify-center"
                      style={{ zIndex: 1 }}
                    >
                      {isFirstStop || isLastStop || step.isInterchange ? (
                        <span
                          className="w-4 h-4 rounded-full border-2 bg-white dark:bg-neutral-900 flex-shrink-0"
                          style={{ borderColor: segment.primaryColor }}
                        />
                      ) : (
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: segment.primaryColor + "88" }}
                        />
                      )}
                    </div>

                    {/* Station info */}
                    <div
                      className={`pb-4 flex flex-col gap-0.5 ${
                        isFirstStop || isLastStop
                          ? "font-semibold"
                          : "font-normal"
                      }`}
                    >
                      <span
                        className={`text-sm leading-tight ${
                          isFirstStop
                            ? "text-blue-600 dark:text-blue-400"
                            : isLastStop
                            ? "text-neutral-900 dark:text-white"
                            : "text-neutral-600 dark:text-neutral-400"
                        }`}
                      >
                        {toTitleCase(step.stationName)}
                      </span>
                      {isFirstStop && (
                        <span className="text-[11px] text-blue-500/70 font-normal">
                          Board here
                        </span>
                      )}
                      {isInterchangeStep && (
                        <span className="text-[11px] text-amber-600 font-medium">
                          ↕ Interchange here
                        </span>
                      )}
                      {isLastStop && !isInterchangeStep && (
                        <span className="text-[11px] text-green-600 font-medium">
                          ✓ Destination
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Connector between segments */}
            {!isLast && (
              <div className="flex items-center gap-2 my-2 px-4">
                <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
                <span className="text-[11px] text-amber-600 font-semibold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 whitespace-nowrap">
                  Change line
                </span>
                <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

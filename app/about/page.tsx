import type { Metadata } from "next";
import { SiteHeader } from "@/components/metro/SiteHeader";
import { SiteFooter } from "@/components/metro/SiteFooter";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Delhi Metro Guide — an unofficial route planner for the Delhi Metro network built to help commuters find the fastest and easiest routes.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f6f7fb] dark:bg-neutral-950 flex flex-col">
      <SiteHeader backHref="/" backLabel="Home" />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6 flex-1 w-full">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            About Delhi Metro Guide
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            An unofficial route planner for the DMRC network
          </p>
        </div>

        {/* What is it */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-5 space-y-3">
          <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-600 dark:text-blue-400">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
              </svg>
            </span>
            What is Delhi Metro Guide?
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Delhi Metro Guide is a free, unofficial web application that helps you plan your
            journey across the Delhi Metro network. Enter any two stations and instantly get
            turn-by-turn directions — including which line to board, where to interchange, and
            an estimated travel time and fare.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            This is a personal project built for commuters and visitors who want a fast,
            no-clutter way to navigate Delhi&apos;s extensive metro system.
          </p>
        </div>

        {/* How it works */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-5 space-y-3">
          <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-violet-600 dark:text-violet-400">
                <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
              </svg>
            </span>
            How does it work?
          </h2>
          <div className="space-y-2">
            {[
              { step: "1", text: "Station data for all DMRC lines is stored locally — no third-party API calls are needed." },
              { step: "2", text: "Routes are computed using a graph search algorithm that finds the path with the fewest stops or fewest interchanges depending on your preference." },
              { step: "3", text: "Fare is estimated based on approximate DMRC distance slabs. Travel time uses ~2 minutes per stop plus 5 minutes per interchange." },
            ].map(({ step, text }) => (
              <div key={step} className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-[11px] font-bold text-neutral-500 flex-shrink-0 mt-0.5">
                  {step}
                </span>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Data & Coverage */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-5 space-y-3">
          <h2 className="text-base font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600 dark:text-green-400">
                <path d="M10 1a6 6 0 0 0-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 0 0 .572.729 6.016 6.016 0 0 0 2.856 0A.75.75 0 0 0 12 15.1v-.644c0-1.013.762-1.957 3.815-2.825A6 6 0 0 0 10 1ZM8.863 17.414a.75.75 0 0 0-.226 1.483 9.066 9.066 0 0 0 2.726 0 .75.75 0 0 0-.226-1.483 7.553 7.553 0 0 1-2.274 0Z" />
              </svg>
            </span>
            Lines covered
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "Red Line (LN1)", color: "#c0282c" },
              { name: "Yellow Line (LN2)", color: "#f6d71a" },
              { name: "Blue Line (LN3 + LN4)", color: "#3b76c0" },
              { name: "Green Line (LN5)", color: "#54ab55" },
              { name: "Violet Line (LN6)", color: "#8115ff" },
              { name: "Pink Line (LN7)", color: "#ed91c9" },
              { name: "Magenta Line (LN8)", color: "#f300f3" },
              { name: "Grey Line (LN9)", color: "#808080" },
              { name: "Airport Express (LN10)", color: "#f46808" },
              { name: "Rapid Metro (LN11)", color: "#015b97" },
            ].map((l) => (
              <div key={l.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: l.color }} />
                <span className="text-xs text-neutral-600 dark:text-neutral-400">{l.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-4">
          <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
            <strong>Disclaimer:</strong> This is an unofficial, community-built tool and is not
            affiliated with or endorsed by DMRC (Delhi Metro Rail Corporation). Fare and time
            estimates are approximate. Always verify schedules and fares on the official{" "}
            <a
              href="https://www.delhimetrorail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-amber-900 dark:hover:text-amber-300"
            >
              DMRC website
            </a>
            .
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

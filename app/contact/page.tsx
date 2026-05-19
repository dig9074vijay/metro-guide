import type { Metadata } from "next";
import { SiteHeader } from "@/components/metro/SiteHeader";
import { SiteFooter } from "@/components/metro/SiteFooter";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Delhi Metro Guide team — report a bug, suggest a station update, or share feedback.",
  alternates: { canonical: "/contact" },
};

function ContactCard({
  icon,
  iconBg,
  title,
  description,
  linkHref,
  linkLabel,
  external,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  linkHref: string;
  linkLabel: string;
  external?: boolean;
}) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-5 flex gap-4 items-start">
      <span className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-neutral-900 dark:text-white">{title}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 mb-2 leading-relaxed">
          {description}
        </p>
        <a
          href={linkHref}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline underline-offset-2"
        >
          {linkLabel}
          {external && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 opacity-70">
              <path d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z" />
              <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z" />
            </svg>
          )}
        </a>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f6f7fb] dark:bg-neutral-950 flex flex-col">
      <SiteHeader backHref="/" backLabel="Home" />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6 flex-1 w-full">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Contact
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Found a bug? Want to suggest a station or feature? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="space-y-3">
          <ContactCard
            iconBg="bg-blue-100 dark:bg-blue-900/40"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-600 dark:text-blue-400">
                <path d="M3 4a2 2 0 0 0-2 2v1.161l8.441 4.221a1.25 1.25 0 0 0 1.118 0L19 7.162V6a2 2 0 0 0-2-2H3Z" />
                <path d="m19 8.839-7.77 3.885a2.75 2.75 0 0 1-2.46 0L1 8.839V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.839Z" />
              </svg>
            }
            title="Email"
            description="For general feedback, data corrections, or partnership enquiries."
            linkHref="mailto:dig9074vijay@gmail.com"
            linkLabel="dig9074vijay@gmail.com"
          />

          <ContactCard
            iconBg="bg-neutral-100 dark:bg-neutral-800"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-neutral-600 dark:text-neutral-400">
                <path fillRule="evenodd" d="M10 2C5.477 2 2 5.477 2 10c0 3.536 2.29 6.533 5.47 7.59.4.074.546-.174.546-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.925-.889-1.17-.889-1.17-.726-.497.056-.486.056-.486.803.056 1.226.824 1.226.824.714 1.223 1.873.87 2.329.665.073-.517.28-.87.508-1.07-1.777-.202-3.645-.889-3.645-3.953 0-.873.312-1.587.823-2.147-.083-.202-.357-1.016.078-2.117 0 0 .672-.215 2.2.82A7.672 7.672 0 0 1 10 6.42a7.67 7.67 0 0 1 2.003.27c1.527-1.035 2.198-.82 2.198-.82.436 1.1.162 1.915.08 2.117.512.56.821 1.274.821 2.147 0 3.072-1.87 3.748-3.653 3.946.288.248.544.737.544 1.486 0 1.073-.01 1.94-.01 2.203 0 .213.144.463.55.384C15.71 16.53 18 13.535 18 10c0-4.523-3.477-8-8-8Z" clipRule="evenodd" />
              </svg>
            }
            title="GitHub"
            description="Report a bug, request a feature, or contribute to the project."
            linkHref="https://github.com/dig9074vijay/metro-guide"
            linkLabel="github.com/dig9074vijay/metro-guide"
            external
          />

          <ContactCard
            iconBg="bg-sky-100 dark:bg-sky-900/40"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-sky-500">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 20 3.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 .8 7.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.095 4.095 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 0 16.407a11.615 11.615 0 0 0 6.29 1.84" />
              </svg>
            }
            title="Twitter / X"
            description="Follow for updates on new features and station data changes."
            linkHref="https://twitter.com/dig9074vijay"
            linkLabel="@dig9074vijay"
            external
          />
        </div>

        {/* FAQ-style note */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-5 space-y-3">
          <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
            Common requests
          </h2>
          <div className="space-y-3">
            {[
              {
                q: "A station name is wrong or outdated",
                a: "Station renames happen periodically. Please email us or open a GitHub issue with the correct name and we'll update the data.",
              },
              {
                q: "The route looks incorrect",
                a: "Our routing is based on published DMRC line data. If an interchange or path seems wrong, please share the source and destination so we can investigate.",
              },
              {
                q: "Can I use the route data in my project?",
                a: "The station data is compiled from public DMRC information. Please reach out via email before using it in a commercial product.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="pb-3 border-b border-neutral-100 dark:border-neutral-800 last:pb-0 last:border-0">
                <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 mb-1">{q}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-neutral-400 pb-2">
          This is an unofficial project. For official DMRC support, visit{" "}
          <a
            href="https://www.delhimetrorail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-neutral-600 dark:hover:text-neutral-300"
          >
            delhimetrorail.com
          </a>
          .
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}

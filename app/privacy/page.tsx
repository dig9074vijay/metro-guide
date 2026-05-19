import type { Metadata } from "next";
import { SiteHeader } from "@/components/metro/SiteHeader";
import { SiteFooter } from "@/components/metro/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Delhi Metro Guide. We do not collect personal data. Learn how the app handles your information.",
  alternates: { canonical: "/privacy" },
};

const LAST_UPDATED = "20 May 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm p-5 space-y-2">
      <h2 className="text-sm font-bold text-neutral-900 dark:text-white">{title}</h2>
      <div className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f6f7fb] dark:bg-neutral-950 flex flex-col">
      <SiteHeader backHref="/" backLabel="Home" />

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-4 flex-1 w-full">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-2xl px-4 py-3">
          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
            Short version: We do not collect, store, or sell any personal data. Delhi Metro Guide
            works entirely in your browser.
          </p>
        </div>

        <Section title="1. Who we are">
          <p>
            Delhi Metro Guide (<strong>delhimetroguide.in</strong>) is an unofficial, free route
            planner for the Delhi Metro network. It is not affiliated with DMRC.
          </p>
        </Section>

        <Section title="2. Data we do NOT collect">
          <ul className="list-disc list-inside space-y-1">
            <li>No account registration or login is required.</li>
            <li>We do not store the stations you search for.</li>
            <li>We do not collect your name, email, or any contact information.</li>
            <li>We do not track your location.</li>
            <li>We do not use advertising networks or sell data to third parties.</li>
          </ul>
        </Section>

        <Section title="3. Route searches">
          <p>
            Route searches are processed entirely on our server and the result is returned to
            your browser. We do not log or persist the source/destination stations you enter.
            No search history is stored on our end.
          </p>
        </Section>

        <Section title="4. Cookies">
          <p>
            Delhi Metro Guide does not use tracking cookies or persistent cookies. Your dark/light
            mode preference may be remembered by your browser&apos;s built-in
            <code className="mx-1 px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-xs font-mono">
              prefers-color-scheme
            </code>
            media feature — no cookie is set by us.
          </p>
        </Section>

        <Section title="5. Third-party services">
          <p>
            We use <strong>Google Fonts</strong> (Geist) which may load font files from Google
            servers. Google&apos;s font service may log your IP address as part of normal web
            requests. See{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:opacity-80"
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </p>
          <p>
            If the site is hosted on <strong>Vercel</strong>, Vercel may collect anonymised
            request logs (IP address, URL, timestamp) for infrastructure purposes. See{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:opacity-80"
            >
              Vercel&apos;s Privacy Policy
            </a>
            .
          </p>
        </Section>

        <Section title="6. Children's privacy">
          <p>
            This service is a general-purpose transit tool and does not knowingly collect data
            from children under 13.
          </p>
        </Section>

        <Section title="7. Changes to this policy">
          <p>
            We may update this privacy policy from time to time. Changes will be reflected by the
            &quot;Last updated&quot; date above. Continued use of the service constitutes
            acceptance of the updated policy.
          </p>
        </Section>

        <Section title="8. Contact">
          <p>
            If you have any questions about this privacy policy, please reach out via our{" "}
            <a href="/contact" className="text-blue-600 dark:text-blue-400 underline underline-offset-2 hover:opacity-80">
              contact page
            </a>
            .
          </p>
        </Section>
      </main>

      <SiteFooter />
    </div>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const APP_URL = "https://delhi-metro-guide.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Delhi Metro Guide — Route Planner & Interchange Finder",
    template: "%s | Delhi Metro Guide",
  },
  description:
    "Plan your Delhi Metro journey instantly. Find the fastest routes, minimum interchanges, travel time, and fare across all metro lines including Yellow, Blue, Red, Pink, Magenta, Violet, Green, Grey, and Airport Express.",
  keywords: [
    "Delhi Metro",
    "Delhi Metro route planner",
    "Delhi Metro map",
    "metro route finder",
    "Delhi Metro fare calculator",
    "Delhi Metro interchange",
    "DMRC route",
    "metro stations Delhi",
    "metro time table",
    "Delhi public transport",
  ],
  authors: [{ name: "Delhi Metro Guide" }],
  creator: "Delhi Metro Guide",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: APP_URL,
    siteName: "Delhi Metro Guide",
    title: "Delhi Metro Guide — Route Planner & Interchange Finder",
    description:
      "Plan your Delhi Metro journey instantly. Find fastest routes and minimum interchanges across all lines including Airport Express, Pink Line, Magenta Line and more.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Delhi Metro Guide — Route Planner & Interchange Finder",
    description:
      "Plan your Delhi Metro journey instantly. Find fastest routes and minimum interchanges across all lines.",
    creator: "@delhimetroguide",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Delhi Metro Guide",
    url: APP_URL,
    description:
      "Plan your Delhi Metro journey. Find fastest routes and minimum interchanges across all DMRC metro lines.",
    applicationCategory: "TravelApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: {
      "@type": "Organization",
      name: "Delhi Metro Guide",
      url: APP_URL,
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

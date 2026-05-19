import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-950 mt-auto">
      <div className="max-w-2xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} Delhi Metro Guide · Unofficial · Not affiliated with DMRC
        </p>
        <nav className="flex items-center gap-12">
          <Link href="/about" className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
            Contact
          </Link>
          <Link href="/privacy" className="text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}

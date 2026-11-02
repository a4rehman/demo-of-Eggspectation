import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl font-semibold text-brand-500">404</p>
      <h1 className="mt-4 font-display text-3xl font-medium tracking-tight sm:text-4xl">
        This page went to brunch
      </h1>
      <p className="mt-3 max-w-sm text-[15px] text-charcoal-50/70">
        We couldn&apos;t find the page you were after — but the menu is always open.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="inline-flex h-12 items-center rounded-full bg-brand-500 px-6 text-sm font-semibold text-cream-50 transition hover:bg-brand-600"
        >
          Back home
        </Link>
        <Link
          href="/menu"
          className="inline-flex h-12 items-center rounded-full border border-charcoal/20 px-6 text-sm font-semibold transition hover:border-brand-500 hover:text-brand-600"
        >
          Browse the menu
        </Link>
      </div>
    </div>
  );
}

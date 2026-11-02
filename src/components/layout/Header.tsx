"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu as MenuIcon, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/providers/CartProvider";
import { Logo } from "@/components/ui/Logo";

const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order Online" },
  { href: "/reservations", label: "Reservations" },
  { href: "/about", label: "Our Story" },
  { href: "/locations", label: "Locations" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount, hydrated, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (isAdmin) return null;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-cream-50/95 shadow-soft backdrop-blur-md"
            : "bg-cream/80 backdrop-blur-sm"
        )}
      >
        <div className="container flex h-[76px] items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center"
          >
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "text-brand-600"
                      : "text-charcoal-600 hover:text-charcoal"
                  )}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-brand-500" aria-hidden />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openDrawer}
              aria-label={`Open cart, ${hydrated ? itemCount : 0} items`}
              className="relative flex size-11 items-center justify-center rounded-full text-charcoal transition hover:bg-charcoal/5"
            >
              <ShoppingBag className="size-5" aria-hidden />
              {hydrated && itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-brand-500 text-[11px] font-bold text-cream-50">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

            <Link
              href="/reservations"
              className="hidden h-11 items-center rounded-full bg-charcoal px-6 text-sm font-semibold text-cream-50 transition hover:bg-charcoal-700 md:inline-flex"
            >
              Book a table
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex size-11 items-center justify-center rounded-full text-charcoal transition hover:bg-charcoal/5 lg:hidden"
            >
              <MenuIcon className="size-6" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-cream-50 shadow-lift"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex h-[76px] items-center justify-between px-5">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="flex size-11 items-center justify-center rounded-full transition hover:bg-charcoal/5"
                >
                  <X className="size-6" aria-hidden />
                </button>
              </div>
              <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "border-b border-cream-200 py-4 font-display text-2xl font-medium tracking-tight transition-colors",
                        pathname === link.href
                          ? "text-brand-600"
                          : "text-charcoal hover:text-brand-600"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="space-y-3 px-5 pb-8">
                <Link
                  href="/reservations"
                  className="flex h-12 items-center justify-center rounded-full bg-brand-500 text-sm font-semibold text-cream-50 transition hover:bg-brand-600"
                >
                  Book a table
                </Link>
                <Link
                  href="/order"
                  className="flex h-12 items-center justify-center rounded-full border border-charcoal/15 text-sm font-semibold transition hover:border-brand-500 hover:text-brand-600"
                >
                  Order online
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

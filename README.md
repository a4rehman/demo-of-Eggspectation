# Eggspectation — Restaurant Website Demo

A premium client-presentation demo website for **Eggspectation** ([@eggspectationpk](https://www.instagram.com/eggspectationpk/?hl=en)), designed and built by
**100Solutionz** to showcase the potential of a full production partnership.

> **This is a concept demo.** No real orders are processed, no real reservations are
> booked, no payments are handled and every address/phone number is an explicit
> placeholder.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Type checking:

```bash
npm run typecheck
```

## Tech stack

---

## Gold Theme Enhancements

The UI has been refreshed with a **luxurious gold accent theme**:
- Added a `gold` color palette with multiple shades in `tailwind.config.ts`.
- Introduced utility classes in `src/app/globals.css`:
  - `.gold-gradient-text` – applies a shimmering gold gradient to text.
  - `.gold-gradient-text-light` – lighter variant for secondary headings.
  - `.glass-panel` / `.glass-panel-dark` – backdrop‑filter glass‑like panels used across cards and sections.
  - `.luxury-gradient-card` – background gradient for premium cards.
- Updated the `Button` component with a `gold` variant for prominent call‑to‑actions.

These utilities can be reused throughout the project to maintain visual consistency and enable fast theming.

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS with a custom design system |
| Motion | Framer Motion (with `prefers-reduced-motion` respect) |
| Icons | Lucide React |
| Data | Local mock data (`src/data`) + LocalStorage demo persistence |
| Deploy | Vercel-ready (no extra config needed) |

## Pages

| Route | Contents |
| --- | --- |
| `/` | Announcement bar, hero, ticker, featured dishes, menu collections, experience, offers, gallery, testimonials, locations preview, reservation CTA, newsletter |
| `/menu` | Category tabs, live search, dietary filters, dish detail modal, add-to-cart |
| `/order` | Delivery/pickup toggle, menu browsing with customisation, bag summary, demo checkout, confirmation screen |
| `/reservations` | Two-step reservation flow with validation and confirmation screen |
| `/about` | Brand story, food philosophy, imagery |
| `/locations` | Room cards, hours, contact details (all placeholders), map placeholder |
| `/contact` | Validated contact form with success state |
| `/admin` | Demo owner dashboard: mock stats, demo orders/reservations from LocalStorage, menu preview with availability toggles |

## Functional features

- Responsive navigation w/ mobile slide-in menu
- Menu filtering by category and dietary needs + keyword search with empty state
- Product detail modal with required/optional customisations and live pricing
- Cart drawer, quantity controls, item removal and **LocalStorage cart persistence**
- Demo checkout simulation (delivery/pickup, validation, mock order number) that
  stores your order for the `/admin` dashboard
- Reservation simulation that stores your booking for the `/admin` dashboard
- Form validation and success/loading states throughout
- Smooth scrolling, scroll-aware header, tasteful scroll-reveal animations

## Cleaner code structure

```
src/
  app/            # App Router pages (home, menu, order, reservations, about, locations, contact, admin)
  components/
    layout/       # Announcement bar, header, mobile menu, cart drawer, footer
    home/         # Homepage sections
    menu/         # Dish cards, dish modal, menu client
    ordering/     # Order + checkout flow
    reservations/ # Reservation flow
    contact/      # Contact form
    admin/        # Demo dashboard
    providers/    # CartProvider (LocalStorage-backed)
    ui/           # Buttons, headings, reveals, logo, badges
  data/           # types-checked mock data: menu, locations, testimonials, media, admin
  lib/            # utils, formatting, demo LocalStorage store
  types/          # shared TypeScript types
```

## Demo-only features (by design)

- Cart, checkout, reservations and contact are **frontend simulations**
- No real payment processing, POS/ordering backend, reservation API or database
- Admin dashboard statistics are mock data; your own demo actions live in LocalStorage
- Newsletter form does not send email
- Map is a stylised placeholder
- Addresses, phone numbers and emails are invented **placeholders** (555 numbers)
  and must be replaced with client-supplied details before launch

## Production requirements (next steps)

1. Content management for menu/pricing (headless CMS or database) with per-location menus
2. Real ordering/POS integration with live kitchen ticketing
3. Payment processing (e.g. card via Stripe/custom payouts)
4. Reservation engine integration (with email/SMS confirmations)
5. Transactional email + SMS providers for confirmation flows
6. Real analytics; replace mock dashboard KPIs with live data
7. Authentication + roles for the staff/owner area
8. Accessibility audit (WCAG 2.2 AA) and performance tuning against live imagery/CDN
9. SEO: structured data (Restaurant schema), sitemaps, per-page OG images
10. Legal pages: privacy policy, terms, allergen disclosures

## Deployment

The project deploys to Vercel with zero configuration — connect the repository and
deploy. `next.config.ts` already allows Unsplash imagery through `next/image`
optimization.

import type { GalleryImage, SpecialOffer } from "@/types";

const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const HERO_IMAGES = {
  main: unsplash("1567620905732-2d1ec7ab7445", 1100),
  secondary: unsplash("1509042239860-f550ce710b93", 640),
  accent: unsplash("1490474418585-ba9bad8fd0ea", 640),
};

export const GALLERY: GalleryImage[] = [
  {
    src: unsplash("1424847651672-bf20a4b0982b", 1200),
    alt: "Friends sharing a spread of waffles and brunch plates around a round table",
    caption: "Weekend tables, long and loud",
    span: "wide",
  },
  {
    src: unsplash("1493770348161-369560ae357d", 1100),
    alt: "Overhead flatlay of smoothie bowls, waffles and berries on a marble table",
    caption: "The morning spread",
    span: "standard",
  },
  {
    src: unsplash("1517248135467-4c7edcad34c4", 1200),
    alt: "Warmly lit dining room with wooden tables and black leather banquettes",
    caption: "Flagship dining room",
    span: "standard",
  },
  {
    src: unsplash("1470337458703-46ad1756a187", 1100),
    alt: "Amber cocktail being poured over a large ice cube with an orange twist",
    caption: "The mimosa & bar hour",
    span: "tall",
  },
  {
    src: unsplash("1509042239860-f550ce710b93", 1100),
    alt: "Latte art roses in ceramic cups surrounded by green plants",
    caption: "Barista craft, daily",
    span: "standard",
  },
  {
    src: unsplash("1445116572660-236099ec97a0", 1200),
    alt: "Cosy cafe table by a large window with a french press and potted plants",
    caption: "Slow mornings, by the window",
    span: "standard",
  },
  {
    src: unsplash("1598103442097-8b74394b95c6", 1100),
    alt: "Cast-iron skillet with a whole roasted chicken and fresh herbs",
    caption: "Straight from the skillet",
    span: "tall",
  },
  {
    src: unsplash("1476224203421-9ac39bcb3327", 1100),
    alt: "Grilled fish plated with roasted potatoes, greens and dipping sauce",
    caption: "Chef's evening boards",
    span: "wide",
  },
];

export const SPECIAL_OFFERS: SpecialOffer[] = [
  {
    id: "early-bird",
    title: "Weekday Early Bird",
    description:
      "20% off any signature plate, Monday to Friday before 10 AM. Because the city deserves breakfast before the inbox.",
    badge: "Save 20%",
    image: unsplash("1541519227354-08fa5d50c44d", 1100),
    ctaLabel: "Order breakfast",
    ctaHref: "/order",
  },
  {
    id: "mimosa-sunday",
    title: "Bottomless Mimosa Sundays",
    description:
      "Fresh-pressed juice and sparkling wine, refilled without asking, every Sunday from open until 3 PM. Tables go fast.",
    badge: "Every Sunday",
    image: unsplash("1470337458703-46ad1756a187", 1100),
    ctaLabel: "Reserve a table",
    ctaHref: "/reservations",
  },
];

export const EXPERIENCE_IMAGES = {
  craft: unsplash("1493770348161-369560ae357d", 1100),
  room: unsplash("1521017432531-fbd92d768814", 1000),
  dinner: unsplash("1414235077428-338989a2e8c0", 1100),
};

export const ABOUT_IMAGES = {
  story: unsplash("1424847651672-bf20a4b0982b", 1200),
  kitchen: unsplash("1476224203421-9ac39bcb3327", 1100),
  detail: unsplash("1608198093002-ad4e005484ec", 900),
  room: unsplash("1514933651103-005eec06c04b", 1100),
};

export const LOCATION_PREVIEW_DATA = [
  { image: unsplash("1517248135467-4c7edcad34c4", 900) },
  { image: unsplash("1521017432531-fbd92d768814", 900) },
  { image: unsplash("1514933651103-005eec06c04b", 900) },
];

export const CATEGORY_IMAGES: Record<string, string> = {
  signature: unsplash("1528207776546-365bb710ee93", 900),
  grills: unsplash("1600891964092-4316c288032e", 900),
  greens: unsplash("1512621776951-a57141f2eefd", 900),
  comfort: unsplash("1467003909585-2f8a72700288", 900),
  bakery: unsplash("1608198093002-ad4e005484ec", 900),
  sips: unsplash("1509042239860-f550ce710b93", 900),
};

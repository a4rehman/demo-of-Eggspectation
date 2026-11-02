import type { LocationBranch } from "@/types";

const unsplash = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/**
 * DEMO NOTE: All addresses, phone numbers and emails below are explicit
 * placeholders. Real branch details must be supplied by the client before
 * launch — never publish invented contact information.
 */
export const LOCATIONS: LocationBranch[] = [
  {
    id: "harbourside",
    name: "Harbourside Flagship",
    neighborhood: "Waterfront district",
    image: unsplash("1517248135467-4c7edcad34c4"),
    addressPlaceholder: "Address to be confirmed at launch",
    phonePlaceholder: "+1 (555) 000-0111",
    emailPlaceholder: "harbourside@eggspectation-demo.com",
    hours: [
      { days: "Monday – Thursday", time: "7:00 AM – 3:00 PM" },
      { days: "Friday", time: "7:00 AM – 9:00 PM" },
      { days: "Saturday – Sunday", time: "8:00 AM – 9:00 PM", note: "Bottomless mimosa bar" },
    ],
    features: ["Harbour-view patio", "Full bar", "Private dining room"],
  },
  {
    id: "market-square",
    name: "Market Square",
    neighborhood: "Downtown core",
    image: unsplash("1521017432531-fbd92d768814"),
    addressPlaceholder: "Address to be confirmed at launch",
    phonePlaceholder: "+1 (555) 000-0122",
    emailPlaceholder: "marketsquare@eggspectation-demo.com",
    hours: [
      { days: "Monday – Friday", time: "6:30 AM – 4:00 PM" },
      { days: "Saturday", time: "7:00 AM – 4:00 PM" },
      { days: "Sunday", time: "7:00 AM – 3:00 PM" },
    ],
    features: ["Espresso bar", "Quick-pickup counter", "Street terrace"],
  },
  {
    id: "northgate",
    name: "Northgate Commons",
    neighborhood: "North residential quarter",
    image: unsplash("1514933651103-005eec06c04b"),
    addressPlaceholder: "Address to be confirmed at launch",
    phonePlaceholder: "+1 (555) 000-0133",
    emailPlaceholder: "northgate@eggspectation-demo.com",
    hours: [
      { days: "Monday – Thursday", time: "7:00 AM – 3:00 PM" },
      { days: "Friday – Saturday", time: "7:00 AM – 10:00 PM" },
      { days: "Sunday", time: "8:00 AM – 8:00 PM" },
    ],
    features: ["Cosy fireside seating", "Weekend dinner service", "Family booths"],
  },
];

export const PLACEHOLDER_CONTACT = {
  address: "Placeholder — client to provide official address",
  phone: "+1 (555) 000-0000 (demo placeholder)",
  email: "hello@eggspectation-demo.com",
  hours: [
    { days: "Monday – Friday", time: "6:30 AM – 10:00 PM" },
    { days: "Saturday", time: "7:00 AM – 10:00 PM" },
    { days: "Sunday", time: "7:00 AM – 8:00 PM" },
  ] as { days: string; time: string }[],
};

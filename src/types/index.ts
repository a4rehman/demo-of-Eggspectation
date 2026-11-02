export type DietaryTag =
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "spicy"
  | "high-protein";

export type ChoiceOption = {
  id: string;
  name: string;
  price: number;
};

export type Customization = {
  id: string;
  name: string;
  /** "choice" renders radio buttons, "extras" renders checkboxes */
  type: "choice" | "extras";
  required?: boolean;
  max?: number;
  options: ChoiceOption[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietary: DietaryTag[];
  calories: number;
  featured?: boolean;
  popular?: boolean;
  seasonal?: boolean;
  customizations?: Customization[];
};

export type MenuCategory = {
  id: string;
  name: string;
  tagline: string;
  image: string;
};

export type CartOption = {
  name: string;
  price: number;
};

export type CartItem = {
  key: string;
  id: string;
  name: string;
  image: string;
  basePrice: number;
  unitPrice: number;
  qty: number;
  options: string[];
};

export type DemoOrder = {
  id: string;
  type: "delivery" | "pickup";
  customer: string;
  channel: string;
  items: { name: string; qty: number; unitPrice: number }[];
  total: number;
  createdAt: string;
  scheduledFor: string;
};

export type DemoReservation = {
  id: string;
  location: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone?: string;
  occasion?: string;
  notes?: string;
  createdAt: string;
};

export type Testimonial = {
  id: string;
  name: string;
  visit: string;
  rating: number;
  quote: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  span: "tall" | "wide" | "standard";
};

export type SpecialOffer = {
  id: string;
  title: string;
  description: string;
  badge: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
};

export type LocationBranch = {
  id: string;
  name: string;
  neighborhood: string;
  image: string;
  /** Demo placeholders — never publish invented real addresses. */
  addressPlaceholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  hours: { days: string; time: string; note?: string }[];
  features: string[];
};

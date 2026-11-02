export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function formatDateLong(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function generateRef(prefix: string): string {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `${prefix}-${stamp}${rand}`;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  return /^[\d\s()+-]{7,}$/.test(phone.trim());
}

export const DIETARY_META: Record<
  string,
  { label: string; className: string }
> = {
  vegetarian: { label: "Vegetarian", className: "bg-sage-100 text-sage-700" },
  vegan: { label: "Vegan", className: "bg-sage-600 text-cream-50" },
  "gluten-free": {
    label: "Gluten-Free",
    className: "bg-brand-100 text-brand-800",
  },
  spicy: { label: "Spicy", className: "bg-red-100 text-red-700" },
  "high-protein": {
    label: "High-Protein",
    className: "bg-stone-200 text-stone-700",
  },
};

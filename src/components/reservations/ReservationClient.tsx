"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  Clock,
  Info,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { LOCATIONS } from "@/data/locations";
import type { DemoReservation } from "@/types";
import {
  cn,
  formatDateLong,
  generateRef,
  isValidEmail,
  isValidPhone,
} from "@/lib/utils";
import { saveDemoReservation } from "@/lib/demo-store";
import { Button, ButtonLink } from "@/components/ui/Button";

const TIME_SLOTS = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
  "2:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM",
];

const OCCASIONS = ["No occasion", "Birthday brunch", "Anniversary", "Business breakfast", "Team celebration", "Catch-up with friends"];

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export function ReservationClient() {
  const searchParams = useSearchParams();
  const initialGuests = Number(searchParams.get("guests")) || 2;
  const initialTime = searchParams.get("time") || "";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [locationId, setLocationId] = useState(LOCATIONS[0].id);
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState(initialTime);
  const [guests, setGuests] = useState(initialGuests);
  const [occasion, setOccasion] = useState(OCCASIONS[0]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reference, setReference] = useState<string | null>(null);

  const location = LOCATIONS.find((l) => l.id === locationId)!;

  const setField = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validateStep1 = () => {
    const next: Record<string, string> = {};
    if (!date) next.date = "Pick a date for your visit.";
    else if (date < todayISO()) next.date = "That date has already passed.";
    if (!time) next.time = "Choose a time that suits you.";
    if (guests < 1 || guests > 14) next.guests = "For parties over 14, please call us.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateStep2 = () => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please give us a name for the booking.";
    if (!isValidEmail(form.email)) next.email = "We need a valid email for the confirmation.";
    if (!isValidPhone(form.phone)) next.phone = "A phone number helps if the kitchen runs late.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const confirm = () => {
    if (!validateStep2()) return;
    const reservation: DemoReservation = {
      id: generateRef("EGG-BR"),
      location: locationId,
      date,
      time,
      guests,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      occasion: occasion !== OCCASIONS[0] ? occasion : undefined,
      notes: form.notes.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    saveDemoReservation(reservation);
    setReference(reservation.id);
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (step === 3) {
    return (
      <div className="container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="grid size-24 place-items-center rounded-full bg-sage-600 text-cream-50 shadow-glow-brand"
        >
          <Check className="size-12" aria-hidden />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h1 className="mt-8 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Table booked — see you there!
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-charcoal-50/75">
            (Demo confirmation — nothing was sent and no table was actually held. The reservation is stored locally for the demo dashboard.)
          </p>

          <div className="mx-auto mt-8 w-full max-w-md rounded-[1.75rem] border border-cream-300 bg-cream-50 p-6 text-left shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-charcoal-50/75">Booking ref</span>
              <span className="font-display text-lg font-semibold text-brand-600">{reference}</span>
            </div>
            <ul className="mt-4 space-y-3 border-t border-cream-200 pt-4 text-sm text-charcoal-50/80">
              <SummaryRow icon={Building2} label="Location" value={location.name} />
              <SummaryRow icon={CalendarDays} label="Date" value={formatDateLong(date)} />
              <SummaryRow icon={Clock} label="Time" value={time} />
              <SummaryRow icon={Users} label="Party" value={`${guests} ${guests === 1 ? "guest" : "guests"}`} />
              {occasion !== OCCASIONS[0] && <SummaryRow icon={Info} label="Occasion" value={occasion} />}
            </ul>
            <p className="mt-4 rounded-2xl bg-brand-50 p-4 text-xs leading-relaxed text-brand-800">
              Real production version: guest receives an email and SMS confirmation, can
              modify or cancel, and the booking syncs to the restaurant&apos;s reservation system.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/menu" withArrow>Plan your order</ButtonLink>
            <ButtonLink href="/admin" variant="outline">See demo dashboard</ButtonLink>
            <Button
              variant="ghost"
              onClick={() => {
                setReference(null);
                setTime("");
                setStep(1);
              }}
            >
              Book another table
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container pb-24 pt-10 md:pt-14">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
          <span className="h-px w-8 bg-brand-400" aria-hidden /> Reservations
        </span>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-6xl">
          Save your seat at the table
        </h1>
        <p className="mt-3 text-[15px] text-charcoal-50/80">
          Two quick steps. Instant, polite, and simulated — no real bookings are made in this demo.
        </p>
      </div>

      {/* Progress */}
      <div className="mx-auto mt-10 flex max-w-md items-center gap-3">
        {(["When & where", "Your details"] as const).map((label, i) => {
          const stage = i + 1;
          const done = step > stage;
          const current = step === stage;
          return (
            <div key={label} className="flex flex-1 flex-col items-center gap-2">
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-full text-sm font-bold transition-colors",
                  done || current ? "bg-brand-500 text-cream-50" : "bg-cream-200 text-charcoal-50/75"
                )}
              >
                {done ? <Check className="size-4" aria-hidden /> : stage}
              </span>
              <span className={cn("text-xs font-bold uppercase tracking-[0.12em]", current ? "text-charcoal" : "text-charcoal-50/75")}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.section
              key="step1"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="rounded-[2rem] border border-cream-300 bg-cream-50 p-6 shadow-soft sm:p-8"
            >
              <h2 className="font-display text-2xl font-semibold tracking-tight">When &amp; where</h2>

              {/* Location */}
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-50/75">Choose your room</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {LOCATIONS.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setLocationId(loc.id)}
                      aria-pressed={locationId === loc.id}
                      className={cn(
                        "rounded-2xl border p-4 text-left transition",
                        locationId === loc.id ? "border-brand-500 bg-brand-50" : "border-cream-300 hover:border-brand-300"
                      )}
                    >
                      <Building2 className={cn("size-5", locationId === loc.id ? "text-brand-600" : "text-charcoal-50/75")} aria-hidden />
                      <span className="mt-2 block text-sm font-bold">{loc.name}</span>
                      <span className="block text-xs text-charcoal-50/80">{loc.neighborhood}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & guests */}
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="res-date" className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
                    Date
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    min={todayISO()}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setErrors((err) => ({ ...err, date: "" }));
                    }}
                    aria-invalid={Boolean(errors.date)}
                    className={cn(
                      "mt-2 h-12 w-full rounded-2xl border bg-cream-100/60 px-4 text-sm font-medium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200",
                      errors.date ? "border-red-400" : "border-cream-300"
                    )}
                  />
                  {errors.date && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.date}</p>}
                </div>
                <div>
                  <label htmlFor="res-guests" className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
                    Guests
                  </label>
                  <div className="mt-2 inline-flex h-12 items-center rounded-2xl border border-cream-300 bg-cream-100/60 px-1">
                    <button
                      type="button"
                      aria-label="Fewer guests"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="flex size-10 items-center justify-center rounded-xl hover:text-brand-600"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-bold" aria-live="polite">{guests}</span>
                    <button
                      type="button"
                      aria-label="More guests"
                      onClick={() => setGuests((g) => Math.min(14, g + 1))}
                      className="flex size-10 items-center justify-center rounded-xl hover:text-brand-600"
                    >
                      +
                    </button>
                  </div>
                  {guests >= 10 && (
                    <p className="mt-1.5 text-xs font-semibold text-brand-700">
                      Parties of 10+ are seated on the long table — perfect.
                    </p>
                  )}
                  {errors.guests && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.guests}</p>}
                </div>
              </div>

              {/* Time slots */}
              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-50/75">Available times</p>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {TIME_SLOTS.map((slot, i) => {
                    const unavailable = i === 3 || i === 11; // a couple of "booked" slots for realism
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={unavailable}
                        onClick={() => {
                          setTime(slot);
                          setErrors((err) => ({ ...err, time: "" }));
                        }}
                        aria-pressed={time === slot}
                        className={cn(
                          "rounded-xl border px-2 py-2.5 text-xs font-semibold transition",
                          unavailable
                            ? "cursor-not-allowed border-cream-200 bg-cream-100 text-charcoal-50/30 line-through"
                            : time === slot
                              ? "border-charcoal bg-charcoal text-cream-50"
                              : "border-cream-300 bg-cream-100/60 hover:border-brand-400 hover:text-brand-700"
                        )}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {errors.time && <p className="mt-2 text-xs font-semibold text-red-500">{errors.time}</p>}
              </div>

              {/* Occasion */}
              <div className="mt-6">
                <label htmlFor="res-occasion" className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
                  Occasion (optional)
                </label>
                <select
                  id="res-occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="mt-2 h-12 w-full appearance-none rounded-2xl border border-cream-300 bg-cream-100/60 px-4 text-sm font-medium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                >
                  {OCCASIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="mt-8 flex justify-end">
                <Button
                  withArrow
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                >
                  Continue
                </Button>
              </div>
            </motion.section>
          )}

          {step === 2 && (
            <motion.section
              key="step2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
              className="rounded-[2rem] border border-cream-300 bg-cream-50 p-6 shadow-soft sm:p-8"
            >
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 text-sm font-bold text-charcoal-50/70 transition hover:text-brand-600"
              >
                <ArrowLeft className="size-4" aria-hidden /> Edit time &amp; party
              </button>

              <div className="mt-4 rounded-2xl bg-cream-100 p-5">
                <p className="text-sm font-bold">{formatDateLong(date)}</p>
                <p className="mt-1 text-sm text-charcoal-50/75">
                  {time} · {guests} {guests === 1 ? "guest" : "guests"} · {location.name}
                </p>
              </div>

              <h2 className="mt-8 font-display text-2xl font-semibold tracking-tight">Who&apos;s coming?</h2>
              <div className="mt-5 grid gap-5">
                <GuestField
                  id="res-name"
                  label="Full name"
                  icon={Building2}
                  value={form.name}
                  error={errors.name}
                  onChange={(v) => setField("name", v)}
                  placeholder="Jane Diner"
                  autoComplete="name"
                />
                <div className="grid gap-5 sm:grid-cols-2">
                  <GuestField
                    id="res-email"
                    label="Email"
                    icon={Mail}
                    value={form.email}
                    error={errors.email}
                    onChange={(v) => setField("email", v)}
                    placeholder="you@hungry.com"
                    type="email"
                    autoComplete="email"
                  />
                  <GuestField
                    id="res-phone"
                    label="Phone"
                    icon={Phone}
                    value={form.phone}
                    error={errors.phone}
                    onChange={(v) => setField("phone", v)}
                    placeholder="(555) 000-0000"
                    type="tel"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <label htmlFor="res-notes" className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
                    Special requests (optional)
                  </label>
                  <textarea
                    id="res-notes"
                    value={form.notes}
                    onChange={(e) => setField("notes", e.target.value)}
                    placeholder="Window seat, highchair, allergies, candle on the pancakes…"
                    rows={3}
                    className="mt-2 w-full rounded-2xl border border-cream-300 bg-cream-100/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4">
                <p className="text-xs text-charcoal-50/75">
                  By continuing you agree to the demo terms: nothing real happens here.
                </p>
                <Button withArrow onClick={confirm}>
                  Confirm reservation
                </Button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-2 text-charcoal-50/80">
        <Icon className="size-4 text-charcoal-50/45" aria-hidden />
        {label}
      </span>
      <span className="text-right font-semibold text-charcoal">{value}</span>
    </li>
  );
}

function GuestField({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  icon: typeof Building2;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
        {label}
      </label>
      <div className="relative mt-2">
        <Icon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-charcoal-50/40" aria-hidden />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className={cn(
            "h-12 w-full rounded-2xl border bg-cream-100/60 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200",
            error ? "border-red-400" : "border-cream-300"
          )}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

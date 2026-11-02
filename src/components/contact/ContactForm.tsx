"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { isValidEmail, isValidPhone, cn } from "@/lib/utils";

const SUBJECT_OPTIONS = [
  "General enquiry",
  "Large group / brunch club",
  "Catering",
  "Feedback for the kitchen",
  "Press & partnerships",
];

type Status = "idle" | "sending" | "success";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: SUBJECT_OPTIONS[0], message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const setField = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please share your name.";
    if (!isValidEmail(form.email)) next.email = "A valid email helps us reply.";
    if (form.phone && !isValidPhone(form.phone)) next.phone = "That phone number looks off.";
    if (form.message.trim().length < 10) next.message = "Tell us a little more (10+ characters).";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    // Demo simulation — production wires this to an email service.
    setTimeout(() => {
      setStatus("success");
    }, 900);
  };

  const reset = () => {
    setForm({ name: "", email: "", phone: "", subject: SUBJECT_OPTIONS[0], message: "" });
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-cream-300 bg-cream-50 p-10 text-center shadow-soft"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-sage-600 text-cream-50">
          <CheckCircle2 className="size-8" aria-hidden />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
          Message received — hypothetically
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-charcoal-50/75">
          This demo doesn&apos;t send email. In production, this form routes to the
          team inbox with spam filtering and auto-replies.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 h-11 rounded-full border border-charcoal/20 px-6 text-sm font-semibold transition hover:border-brand-500 hover:text-brand-600"
        >
          Write another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="rounded-[2rem] border border-cream-300 bg-cream-50 p-6 shadow-soft sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <CField
          id="contact-name"
          label="Full name *"
          value={form.name}
          error={errors.name}
          onChange={(v) => setField("name", v)}
          placeholder="Jane Diner"
          autoComplete="name"
        />
        <CField
          id="contact-email"
          label="Email *"
          type="email"
          value={form.email}
          error={errors.email}
          onChange={(v) => setField("email", v)}
          placeholder="you@hungry.com"
          autoComplete="email"
        />
        <CField
          id="contact-phone"
          label="Phone (optional)"
          type="tel"
          value={form.phone}
          error={errors.phone}
          onChange={(v) => setField("phone", v)}
          placeholder="(555) 000-0000"
          autoComplete="tel"
        />
        <div>
          <label htmlFor="contact-subject" className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
            Subject
          </label>
          <select
            id="contact-subject"
            value={form.subject}
            onChange={(e) => setField("subject", e.target.value)}
            className="mt-2 h-12 w-full appearance-none rounded-2xl border border-cream-300 bg-cream-100/60 px-4 text-sm font-medium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
          >
            {SUBJECT_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
            Message *
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={form.message}
            onChange={(e) => setField("message", e.target.value)}
            placeholder="What's on your mind? (10+ characters)"
            aria-invalid={Boolean(errors.message)}
            className={cn(
              "mt-2 w-full rounded-2xl border bg-cream-100/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200",
              errors.message ? "border-red-400" : "border-cream-300"
            )}
          />
          {errors.message && (
            <p className="mt-1.5 text-xs font-semibold text-red-500" role="alert">
              {errors.message}
            </p>
          )}
        </div>
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-[15px] font-semibold text-cream-50 shadow-glow-brand transition hover:bg-brand-600 disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-cream-50/40 border-t-cream-50" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden />
            Send message
          </>
        )}
      </button>
    </form>
  );
}

function CField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={cn(
          "mt-2 h-12 w-full rounded-2xl border bg-cream-100/60 px-4 text-sm font-medium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200",
          error ? "border-red-400" : "border-cream-300"
        )}
      />
      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-500" role="alert">
          {error.trim()}
        </p>
      )}
    </div>
  );
}

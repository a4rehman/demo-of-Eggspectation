import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PLACEHOLDER_CONTACT } from "@/data/locations";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeading } from "@/components/ui/Display";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Eggspectation — enquiries, feedback and large groups. Contact details are demo placeholders pending client information.",
};

export default function ContactPage() {
  return (
    <div className="container pb-24 pt-10 md:pt-14">
      <div className="max-w-2xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk breakfast"
          description="Questions, brunch clubs of impressive size, catering dreams or feedback for the kitchen — everything lands with the team."
        />
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1} className="space-y-6">
          <div className="rounded-[2rem] border border-cream-300 bg-cream-50 p-7 shadow-soft">
            <h2 className="font-display text-xl font-semibold tracking-tight">Reach us directly</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cream-100 text-brand-600">
                  <Phone className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold">Phone</span>
                  <a href="tel:+15550000000" className="text-charcoal-50/75 transition hover:text-brand-600">
                    {PLACEHOLDER_CONTACT.phone}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cream-100 text-brand-600">
                  <Mail className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold">Email</span>
                  <a href={`mailto:${PLACEHOLDER_CONTACT.email}`} className="text-charcoal-50/75 transition hover:text-brand-600">
                    {PLACEHOLDER_CONTACT.email}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cream-100 text-brand-600">
                  <MapPin className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold">Head office</span>
                  <span className="text-charcoal-50/75">{PLACEHOLDER_CONTACT.address}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-cream-100 text-brand-600">
                  <Clock className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold">Kitchen hours</span>
                  {PLACEHOLDER_CONTACT.hours.map((row) => (
                    <span key={row.days} className="block text-charcoal-50/75">
                      {row.days}: {row.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-[2rem] bg-brand-50 p-7">
            <h2 className="font-display text-lg font-semibold tracking-tight text-brand-800">
              Large groups & catering
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brand-900/75">
              The long table seats fourteen and the catering van leaves early. Send us
              the details through the form and mark the subject as
              &ldquo;Catering&rdquo; — the fastest route to a menu tasting.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

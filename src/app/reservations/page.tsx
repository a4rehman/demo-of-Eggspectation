import type { Metadata } from "next";
import { ReservationClient } from "@/components/reservations/ReservationClient";

export const metadata: Metadata = {
  title: "Reservations",
  description:
    "Reserve your Eggspectation table — choose your room, date, time and party size. Simulated demo booking flow.",
};

export default function ReservationsPage() {
  return <ReservationClient />;
}

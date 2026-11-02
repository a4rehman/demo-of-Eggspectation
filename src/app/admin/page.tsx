import type { Metadata } from "next";
import { AdminClient } from "@/components/admin/AdminClient";

export const metadata: Metadata = {
  title: "Demo Dashboard",
  description:
    "Owner dashboard concept preview — demonstration data only, not connected to any real system.",
  robots: { index: false },
};

export default function AdminPage() {
  return <AdminClient />;
}

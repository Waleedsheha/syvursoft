import type { LucideIcon } from "lucide-react";
import { BrainCircuit, Building2, ScanLine } from "lucide-react";

export type ProductId = "radex" | "mend" | "adam";

export type ProductInfo = {
  id: ProductId;
  name: string;
  shortRole: string;
  description: string;
  href?: string;
  status?: "under-development";
  accent: string;
  Icon: LucideIcon;
};

export const products: ProductInfo[] = [
  {
    id: "radex",
    name: "RADex",
    shortRole: "Radiology engine",
    description:
      "Unified RIS, PACS, DICOM viewer, reporting, scheduling, billing, and operational tools for diagnostic imaging teams.",
    href: "/radex",
    accent: "from-orange-500 to-red-600",
    Icon: ScanLine,
  },
  {
    id: "mend",
    name: "MEND",
    shortRole: "Facility operating system",
    description:
      "A digital simulation of any medical facility, giving every team the dashboards and workflows needed to control operations from every corner.",
    href: "/mend",
    accent: "from-cyan-500 to-blue-600",
    Icon: Building2,
  },
  {
    id: "adam",
    name: "ADAM",
    shortRole: "Under development",
    description:
      "AI orchestration for insight, automation, decision support, and cross-product intelligence across the Syvursoft ecosystem.",
    status: "under-development",
    accent: "from-emerald-500 to-teal-600",
    Icon: BrainCircuit,
  },
];

export function getProduct(id: ProductId) {
  return products.find((product) => product.id === id);
}

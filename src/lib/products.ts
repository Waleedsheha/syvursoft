import type { LucideIcon } from "lucide-react";
import { BrainCircuit, Building2, ScanLine } from "lucide-react";

/* Each product's role and description are in the messages, under products.<id>. */
export type ProductId = "radex" | "mend" | "adam";

export type ProductInfo = {
  id: ProductId;
  name: string;
  href?: string;
  status?: "under-development";
  accent: string;
  Icon: LucideIcon;
};

export const products: ProductInfo[] = [
  {
    id: "radex",
    name: "RADex",
    href: "/radex",
    accent: "from-orange-500 to-red-600",
    Icon: ScanLine,
  },
  {
    id: "mend",
    name: "MEND",
    href: "/mend",
    accent: "from-cyan-500 to-blue-600",
    Icon: Building2,
  },
  {
    id: "adam",
    name: "ADAM",
    status: "under-development",
    accent: "from-emerald-500 to-teal-600",
    Icon: BrainCircuit,
  },
];

export function getProduct(id: ProductId) {
  return products.find((product) => product.id === id);
}

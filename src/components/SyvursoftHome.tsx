import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactGrid from "@/components/ContactGrid";
import SyvursoftHero from "@/components/SyvursoftHero";
import CompanyMission from "@/components/CompanyMission";
import ProductEcosystem from "@/components/ProductEcosystem";
import AnimatedSystemMap from "@/components/AnimatedSystemMap";

export default function SyvursoftHome() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f4f8fb] text-slate-950 selection:bg-cyan-100 selection:text-sky-950">
      <Header />
      <SyvursoftHero />
      <CompanyMission />
      <ProductEcosystem />
      <AnimatedSystemMap />
      <ContactGrid />
      <Footer />
    </main>
  );
}

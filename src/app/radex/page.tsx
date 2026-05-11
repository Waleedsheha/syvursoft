import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RadexFeatures from "@/components/RadexFeatures";
import CompleteEcosystem from "@/components/CompleteEcosystem";
import ContactGrid from "@/components/ContactGrid";
import Footer from "@/components/Footer";

export default function RadexPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-100 via-amber-50 to-white">
      <Header />
      <Hero />
      <RadexFeatures />
      <CompleteEcosystem />
      <ContactGrid />
      <Footer />
    </main>
  );
}

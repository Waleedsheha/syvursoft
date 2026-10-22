import { headers } from "next/headers";
import { setRequestLocale } from "next-intl/server";
import SyvursoftHome from "@/components/SyvursoftHome";
import WelcomeGate from "@/components/WelcomeGate";
import { GATE_HEADER } from "@/lib/gate";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const gate = (await headers()).get(GATE_HEADER);
  if (gate !== "open" && gate !== "closed") {
    throw new Error(`The welcome gate proxy did not run for the home page (${GATE_HEADER} is ${gate}).`);
  }
  const closed = gate === "closed";

  return (
    <>
      {closed && <WelcomeGate />}
      <div inert={closed}>
        <SyvursoftHome />
      </div>
    </>
  );
}

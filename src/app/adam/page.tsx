import {
  FeatureList,
  ProductHero,
  ProductPageShell,
  ProductSection,
} from "@/components/ProductPageShell";

const intelligenceFeatures = [
  "Clinical intelligence across Syvursoft products, turning operational and clinical signals into usable context.",
  "Insight surfaces that help teams understand what is happening, what needs attention, and where decisions are forming.",
  "Decision-support framing that keeps recommendations explainable, reviewable, and connected to the clinician's workflow.",
  "Cross-product awareness so imaging, facility operations, patient movement, and documentation can inform one another.",
];

const orchestrationFeatures = [
  "AI orchestration for repetitive clinical and administrative steps that benefit from guided automation.",
  "Workflow automation that can route information between products without asking teams to manually rebuild context.",
  "Connection between RADex and MEND so radiology activity and facility operations can support a shared patient picture.",
  "Structured intelligence that helps reduce fragmented work across dashboards, modules, and departmental systems.",
];

const trustFeatures = [
  "Clinician-in-the-loop positioning that treats AI as support for human judgment, not a replacement for it.",
  "Human-centered review points for sensitive decisions, clinical interpretation, and operational escalation.",
  "Trust-focused product behavior built around clarity, traceability, and controlled automation.",
  "Designed to support doctors, nurses, administrators, and operators with the right level of intelligence for their role.",
];

export default function AdamPage() {
  return (
    <ProductPageShell>
      <ProductHero
        eyebrow="ADAM clinical intelligence layer"
        title="Clinical intelligence that connects the Syvursoft ecosystem."
        description="ADAM is the intelligence and orchestration layer that helps Syvursoft products work together, bringing insight, automation, and decision support into clinical and operational workflows."
        highlights={[
          "Connects product signals across RADex, MEND, and the wider platform.",
          "Frames intelligence as reviewed support for clinicians and operators.",
          "Turns automation into governed workflow assistance, not opaque control.",
        ]}
      />

      <ProductSection
        eyebrow="Intelligence"
        title="Insight that stays close to the clinical workflow"
        description="ADAM is designed to help teams reason faster across product data while preserving the human context needed for safe medical work."
      >
        <FeatureList items={intelligenceFeatures} />
      </ProductSection>

      <ProductSection
        eyebrow="Orchestration"
        title="Automation across products, departments, and decisions"
        description="Instead of leaving every product as an isolated system, ADAM coordinates useful context between Syvursoft products so work can move with less friction."
      >
        <FeatureList items={orchestrationFeatures} />
      </ProductSection>

      <ProductSection
        eyebrow="Trust model"
        title="Clinician-in-the-loop by design"
        description="ADAM is positioned around human-centered trust: intelligence should clarify, surface, and assist while clinicians and accountable teams remain in control."
      >
        <FeatureList items={trustFeatures} />
      </ProductSection>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              RADex plus MEND
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Imaging intelligence connected to facility operations.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-200">
              ADAM can frame radiology activity from RADex alongside facility
              operations from MEND, helping teams understand care progress,
              service bottlenecks, documentation needs, and next operational
              steps.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
              Governed support
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              Useful AI without removing clinical accountability.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              ADAM keeps the product posture practical: surface the signal,
              automate the routine, explain the context, and leave clinical
              judgment with the professionals responsible for care.
            </p>
          </div>
        </div>
      </section>
    </ProductPageShell>
  );
}

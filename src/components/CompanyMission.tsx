const missionSections = [
  {
    title: "Why Syvursoft exists",
    text: "Syvursoft was started to make medical software that feels practical at the point of care: fast enough for pressure, structured enough for operations, and clear enough to improve decisions.",
    tone: "text-sky-600 bg-sky-50 ring-sky-100",
  },
  {
    title: "Clinical credibility",
    text: "Founded by an emergency and critical care physician, our products are shaped by real clinical environments where complex data, limited time, and patient safety all meet.",
    tone: "text-blue-600 bg-blue-50 ring-blue-100",
  },
  {
    title: "Operating principles",
    text: "We build for medical accuracy, workflow clarity, accessibility across resource settings, and continuous improvement as new clinical and operational problems appear.",
    tone: "text-emerald-600 bg-emerald-50 ring-emerald-100",
  },
];

export default function CompanyMission() {
  return (
    <section className="relative overflow-hidden bg-[#f4f8fb] px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute left-1/2 top-[-80px] h-80 w-[min(640px,80vw)] -translate-x-1/2 rounded-full bg-sky-300/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-sky-700">
              Mission
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-5xl">
              Software for the way healthcare actually works.
            </h2>
          </div>

          <div className="grid gap-4">
            {missionSections.map(({ title, text, tone }) => (
              <article
                key={title}
                className="group relative grid gap-5 overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_80px_rgba(96,165,250,0.10)] backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-sky-200 hover:shadow-[0_32px_72px_rgba(15,23,42,0.12)] sm:grid-cols-[56px_1fr]"
              >
                <div className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(120deg,transparent,rgba(14,165,233,0.08),transparent)] transition duration-700 group-hover:translate-x-[120%]" />
                <div
                  className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition duration-300 group-hover:scale-110 ${tone}`}
                />
                <div className="relative">
                  <h3 className="text-xl font-semibold text-slate-950">
                    {title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

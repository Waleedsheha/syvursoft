import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";

type LabelledItem = { label: string; text: string };

// Renders the first occurrence of `value` in translated text through `wrap`, keeping the text around it.
function wrapFirst(text: string, value: string, wrap: (value: string) => ReactNode): ReactNode {
    const at = text.indexOf(value);
    if (at === -1) {
        throw new Error(`Translated text does not contain "${value}"`);
    }
    return (
        <>
            {text.slice(0, at)}
            {wrap(value)}
            {text.slice(at + value.length)}
        </>
    );
}

export default async function TermsOfService({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const tPage = await getTranslations({ locale, namespace: "terms" });
    const tContact = await getTranslations({ locale, namespace: "terms.contact" });
    const tCards = await getTranslations({ locale, namespace: "contact" });
    const refunds: LabelledItem[] = tPage.raw("sections.refunds.items");

    return (
        <main className="min-h-screen bg-gradient-to-b from-orange-100 via-amber-50 to-white">
            <Header />

            <div className="container mx-auto px-4 py-24 max-w-4xl relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-4">{tPage("title")}</h1>
                <p className="text-gray-500 mb-12">{tPage("lastUpdated")}</p>

                <div className="bg-orange-50/80 backdrop-blur-sm border-s-4 border-orange-500 p-4 mb-12 rounded-e-lg">
                    <p className="text-gray-700 font-medium">
                        {wrapFirst(tPage("notice"), tPage("privacyLink"), (linkText) => (
                            <Link href="/privacy" className="text-cyan-600 hover:underline">{linkText}</Link>
                        ))}
                    </p>
                </div>

                <div className="space-y-12">
                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">{tPage("sections.description.title")}</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            {tPage.raw("sections.description.before")[0]}
                        </p>
                        <div className="bg-red-50 border-s-4 border-red-500 p-4 rounded-e-lg">
                            <p className="text-gray-700">
                                <strong className="text-red-700">{tPage("sections.description.callout.label")}</strong> {tPage("sections.description.callout.text")}
                            </p>
                        </div>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">{tPage("sections.eligibility.title")}</h2>
                        <ul className="list-disc ps-6 space-y-2 text-gray-600">
                            {tPage.raw("sections.eligibility.items").map((item: LabelledItem, index: number) => (
                                <li key={index}><strong className="text-gray-900">{item.label}</strong> {item.text}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">{tPage("sections.prohibited.title")}</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">{tPage.raw("sections.prohibited.before")[0]}</p>
                        <ul className="list-disc ps-6 space-y-2 text-gray-600">
                            {tPage.raw("sections.prohibited.items").map((item: string, index: number) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">{tPage("sections.fees.title")}</h2>
                        <ul className="list-disc ps-6 space-y-2 text-gray-600">
                            {tPage.raw("sections.fees.items").map((item: LabelledItem, index: number) => (
                                <li key={index}><strong className="text-gray-900">{item.label}</strong> {item.text}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">{tPage("sections.refunds.title")}</h2>
                        <div className="space-y-4 text-gray-600">
                            <p><strong className="text-gray-900">{refunds[0].label}</strong> {refunds[0].text}</p>
                            <p><strong className="text-gray-900">{refunds[1].label}</strong> {refunds[1].text}</p>
                            <p><strong className="text-gray-900">{refunds[2].label}</strong> {refunds[2].text}</p>
                            <p><strong className="text-gray-900">{refunds[3].label}</strong> {refunds[3].text}</p>
                            <p><strong className="text-gray-900">{refunds[4].label}</strong> {refunds[4].text}</p>
                            <p>
                                <strong className="text-gray-900">{refunds[5].label}</strong> {wrapFirst(refunds[5].text, "support@syvursoft.com", (address) => (
                                    <a href="mailto:support@syvursoft.com" className="text-cyan-600 hover:underline">{address}</a>
                                ))}
                            </p>
                            <p><strong className="text-gray-900">{refunds[6].label}</strong> {refunds[6].text}</p>
                            <p><strong className="text-gray-900">{refunds[7].label}</strong> {refunds[7].text}</p>
                        </div>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">{tPage("sections.privacy.title")}</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {wrapFirst(tPage.raw("sections.privacy.before")[0], tPage("privacyLink"), (linkText) => (
                                <Link href="/privacy" className="text-cyan-600 hover:underline">{linkText}</Link>
                            ))}
                        </p>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">{tPage("sections.intellectualProperty.title")}</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {tPage.raw("sections.intellectualProperty.before")[0]}
                        </p>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">{tPage("sections.disclaimer.title")}</h2>
                        <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                            <p className="text-gray-700 text-sm uppercase leading-relaxed">
                                {tPage.raw("sections.disclaimer.before")[0]}
                            </p>
                        </div>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">{tPage("sections.liability.title")}</h2>
                        <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 space-y-4">
                            <p className="text-gray-700 text-sm uppercase leading-relaxed">
                                {tPage.raw("sections.liability.before")[0]}
                            </p>
                            <p className="text-gray-700 text-sm uppercase leading-relaxed">
                                {tPage.raw("sections.liability.before")[1]}
                            </p>
                        </div>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">{tPage("sections.indemnification.title")}</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {tPage.raw("sections.indemnification.before")[0]}
                        </p>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">{tPage("sections.termination.title")}</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {tPage.raw("sections.termination.before")[0]}
                        </p>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">{tPage("sections.modifications.title")}</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {tPage.raw("sections.modifications.before")[0]}
                        </p>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">{tPage("sections.governingLaw.title")}</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {tPage.raw("sections.governingLaw.before")[0]}
                        </p>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">{tPage("sections.general.title")}</h2>
                        <ul className="list-disc ps-6 space-y-2 text-gray-600">
                            {tPage.raw("sections.general.items").map((item: LabelledItem, index: number) => (
                                <li key={index}><strong className="text-gray-900">{item.label}</strong> {item.text}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>

            {/* Contact Section */}
            <section className="py-20 bg-gradient-to-b from-orange-100 via-amber-50 to-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <p className="text-orange-500 font-semibold tracking-widest uppercase text-sm mb-3">{tContact("label")}</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0a192f]">
                            {tContact("heading")}<span className="text-orange-500">{tContact("headingAccent")}</span>
                        </h2>
                        <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-teal-500 mx-auto mt-4 rounded-full"></div>
                        <p className="text-gray-600 mt-6 max-w-md mx-auto">{tContact("description")}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Email Card */}
                        <a href="mailto:waleedsheha@syvursoft.com" className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
                            <div className="absolute top-0 end-0 w-32 h-32 bg-gradient-to-bl rtl:bg-gradient-to-br from-orange-100 to-transparent rounded-es-full opacity-60"></div>
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{tCards("items.email.title")}</h3>
                                <p className="text-gray-500 text-sm mb-3">{tCards("items.email.subtitle")}</p>
                                <p className="text-orange-500 font-medium group-hover:text-orange-600 transition-colors">waleedsheha@syvursoft.com</p>
                            </div>
                        </a>

                        {/* WhatsApp Card */}
                        <a href="https://wa.me/201211644172" target="_blank" rel="noopener noreferrer" className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
                            <div className="absolute top-0 end-0 w-32 h-32 bg-gradient-to-bl rtl:bg-gradient-to-br from-green-100 to-transparent rounded-es-full opacity-60"></div>
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center mb-6 shadow-lg shadow-green-200 group-hover:scale-110 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{tCards("items.whatsapp.title")}</h3>
                                <p className="text-gray-500 text-sm mb-3">{tCards("items.whatsapp.subtitle")}</p>
                                <p className="text-green-500 font-medium group-hover:text-green-600 transition-colors"><span dir="ltr">+20 121 164 4172</span></p>
                            </div>
                        </a>

                        {/* Website Card */}
                        <a href="https://Syvursoft.com" target="_blank" rel="noopener noreferrer" className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
                            <div className="absolute top-0 end-0 w-32 h-32 bg-gradient-to-bl rtl:bg-gradient-to-br from-blue-100 to-transparent rounded-es-full opacity-60"></div>
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{tCards("items.website.title")}</h3>
                                <p className="text-gray-500 text-sm mb-3">{tCards("items.website.subtitle")}</p>
                                <p className="text-blue-500 font-medium group-hover:text-blue-600 transition-colors">Syvursoft.com</p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

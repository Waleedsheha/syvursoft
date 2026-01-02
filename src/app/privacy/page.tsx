import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-orange-100 via-amber-50 to-white">
            <Header />

            <div className="container mx-auto px-4 py-24 max-w-4xl relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-4">Privacy Policy</h1>
                <p className="text-gray-500 mb-12">Last Updated: May 15, 2023</p>

                <div className="space-y-12">
                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">1. Introduction</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            At SyvurSoft, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website or use our applications, and tell you about your privacy rights and how the law protects you.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            This policy applies to all information collected through our website <span className="text-cyan-600">https://syvursoft.com</span>, our mobile applications ABGen, Atria and any related services, sales, marketing or events.
                        </p>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">2. Data We Collect</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            When you use ABGen or visit our website, we may collect the following types of information:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li><strong className="text-gray-900">Usage Data:</strong> Anonymous information about how you use our applications, including features accessed and time spent.</li>
                            <li><strong className="text-gray-900">Device Information:</strong> Technical data about the device you use to access our services, including device type, operating system, and browser type.</li>
                            <li><strong className="text-gray-900">Contact Information:</strong> If you contact us for support or participate in our community, we may collect your email address and other contact details you provide.</li>
                            <li><strong className="text-gray-900">Log Data:</strong> Our servers automatically record information that your browser sends whenever you visit our website, such as your IP address, browser type and version, time zone setting, and pages visited.</li>
                            <li><strong className="text-gray-900">Cookies and Similar Technologies:</strong> We may use cookies and similar tracking technologies to track activity on our website and hold certain information.</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            We do not collect or store any patient data or protected health information (PHI) entered into ABGen. All clinical calculations are performed locally on your device.
                        </p>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">3. How We Use Your Data</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">We use the information we collect to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Improve and optimize our applications and services</li>
                            <li>Provide technical support</li>
                            <li>Communicate with you about updates and new features</li>
                            <li>Ensure the security and proper functioning of our applications</li>
                            <li>Analyze usage patterns to improve user experience</li>
                            <li>Respond to your requests, questions, and concerns</li>
                            <li>Comply with applicable laws and regulations</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            We will only use your personal data for the purposes for which we collected it, unless we reasonably consider that we need to use it for another reason compatible with the original purpose.
                        </p>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">4. Legal Basis for Processing</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We will only process your personal data when we have a legal basis to do so. The legal basis will depend on the purposes for which we have collected and use your personal data. In most cases, the legal basis will be one of the following:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li><strong className="text-gray-900">Consent:</strong> You have given us consent to process your personal data for a specific purpose.</li>
                            <li><strong className="text-gray-900">Contract:</strong> Processing is necessary for the performance of a contract with you.</li>
                            <li><strong className="text-gray-900">Legitimate Interests:</strong> Processing is necessary for our legitimate interests or those of a third party, provided those interests are not overridden by your rights and interests.</li>
                            <li><strong className="text-gray-900">Legal Obligation:</strong> Processing is necessary for compliance with a legal obligation.</li>
                        </ul>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">5. Data Sharing and Disclosure</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li><strong className="text-gray-900">Service Providers:</strong> We may share your data with trusted third parties who assist us in operating our website, conducting our business, or servicing you, provided those parties agree to keep this information confidential.</li>
                            <li><strong className="text-gray-900">Legal Requirements:</strong> We may disclose your information where we are legally required to do so to comply with applicable law, governmental requests, judicial proceedings, court orders, or legal processes.</li>
                            <li><strong className="text-gray-900">Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your data may be transferred as part of that transaction.</li>
                            <li><strong className="text-gray-900">With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
                        </ul>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">6. Data Security</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We implement appropriate security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">Our security measures include:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Encryption of sensitive data</li>
                            <li>Regular security assessments</li>
                            <li>Access controls and authentication procedures</li>
                            <li>Secure development practices</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed">
                            We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
                        </p>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">7. Data Retention</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">To determine the appropriate retention period for personal data, we consider:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>The amount, nature, and sensitivity of the personal data</li>
                            <li>The potential risk of harm from unauthorized use or disclosure</li>
                            <li>The purposes for which we process your personal data</li>
                            <li>Whether we can achieve those purposes through other means</li>
                            <li>The applicable legal requirements</li>
                        </ul>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">8. International Data Transfers</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We may transfer, store, and process your information in countries other than your own. Our servers are primarily located in Egypt, but we may use service providers based in various locations globally.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            If we transfer your personal data to countries outside your jurisdiction, we will take steps to ensure that your personal data receives an adequate level of protection, including through:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Using specific contracts approved for use in certain jurisdictions</li>
                            <li>Relying on certification schemes like the EU-US Privacy Shield</li>
                            <li>Obtaining your consent for these transfers where required</li>
                        </ul>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">9. Cookies and Tracking Technologies</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
                        </p>
                        <p className="text-gray-600 leading-relaxed mb-4">We use the following types of cookies:</p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li><strong className="text-gray-900">Essential Cookies:</strong> Necessary for the website to function properly.</li>
                            <li><strong className="text-gray-900">Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.</li>
                            <li><strong className="text-gray-900">Functionality Cookies:</strong> Used to recognize you when you return to our website.</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed">
                            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                        </p>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">10. Your Rights</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Depending on your location, you may have certain rights regarding your personal data, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li><strong className="text-gray-900">Right to Access:</strong> The right to request copies of your personal data.</li>
                            <li><strong className="text-gray-900">Right to Rectification:</strong> The right to request that we correct any inaccurate data about you.</li>
                            <li><strong className="text-gray-900">Right to Erasure:</strong> The right to request that we delete your personal data in certain circumstances.</li>
                            <li><strong className="text-gray-900">Right to Restrict Processing:</strong> The right to request that we restrict the processing of your personal data in certain circumstances.</li>
                            <li><strong className="text-gray-900">Right to Data Portability:</strong> The right to request that we transfer the data we have collected to another organization or directly to you.</li>
                            <li><strong className="text-gray-900">Right to Object:</strong> The right to object to our processing of your personal data in certain circumstances.</li>
                            <li><strong className="text-gray-900">Rights Related to Automated Decision Making:</strong> The right not to be subject to a decision based solely on automated processing.</li>
                        </ul>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            To exercise any of these rights, please contact us using the information provided below. We may need to request specific information from you to help us confirm your identity and ensure your right to access your personal data.
                        </p>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">11. Children&apos;s Privacy</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our services are not intended for use by children under the age of 18, and we do not knowingly collect personal data from children under 18. If we learn we have collected or received personal data from a child under 18 without verification of parental consent, we will delete that information.
                        </p>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">12. Third-Party Links</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our website and applications may contain links to third-party websites or services that are not owned or controlled by SyvurSoft. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
                        </p>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-[#0a192f] mb-4">13. Changes to This Policy</h2>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the &quot;Last Updated&quot; date at the top of this policy.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            We encourage you to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
                        </p>
                    </section>
                </div>
            </div>

            {/* Contact Section */}
            <section className="py-20 bg-gradient-to-b from-orange-200 via-amber-100 to-orange-100 relative z-10">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12">
                        <p className="text-orange-500 font-semibold tracking-widest uppercase text-sm mb-3">Get In Touch</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0a192f]">
                            Contact U<span className="text-orange-500">s</span>
                        </h2>
                        <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-teal-500 mx-auto mt-4 rounded-full"></div>
                        <p className="text-gray-600 mt-6 max-w-md mx-auto">If you have any questions about this privacy policy, please reach out through any of the channels below</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Email Card */}
                        <a href="mailto:Syvursoft@gmail.com" className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-100 to-transparent rounded-bl-full opacity-60"></div>
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                                <p className="text-gray-500 text-sm mb-3">Send us a message anytime</p>
                                <p className="text-orange-500 font-medium group-hover:text-orange-600 transition-colors">Syvursoft@gmail.com</p>
                            </div>
                        </a>

                        {/* WhatsApp Card */}
                        <a href="https://wa.me/201211644172" target="_blank" rel="noopener noreferrer" className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100 to-transparent rounded-bl-full opacity-60"></div>
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center mb-6 shadow-lg shadow-green-200 group-hover:scale-110 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
                                <p className="text-gray-500 text-sm mb-3">Chat with us directly</p>
                                <p className="text-green-500 font-medium group-hover:text-green-600 transition-colors">+20 121 164 4172</p>
                            </div>
                        </a>

                        {/* Website Card */}
                        <a href="https://Syvursoft.com" target="_blank" rel="noopener noreferrer" className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-bl-full opacity-60"></div>
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Website</h3>
                                <p className="text-gray-500 text-sm mb-3">Visit our main site</p>
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

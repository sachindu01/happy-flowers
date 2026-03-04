import React from "react";
import Card, { CardContent, CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";

const HelpCenterPage = () => {
    const faqs = [
        {
            q: "How do I track my plant order?",
            a: "You can track your order by logging into your account and clicking on your User Dashboard. Your recent orders will display their current fulfillment status.",
        },
        {
            q: "What is your return policy?",
            a: "If your plant arrives damaged or unhealthy, please contact us within 48 hours of delivery with photos of the issue. We will arrange a replacement or refund immediately.",
        },
        {
            q: "Do you offer international shipping?",
            a: "We currently only ship domestic orders due to strict agricultural regulations regarding international plant transport.",
        },
        {
            q: "Can I collect my order in person?",
            a: "Yes! During checkout, if the store administrator has enabled it, you can select 'Collect on site' instead of Delivery.",
        },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
            <header className="text-center space-y-4 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-sm border border-emerald-200">
                    ?
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tight">Help Center</h1>
                <p className="text-xl text-slate-500 font-medium">Find answers to common questions or reach out to our support team.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">✓</span>
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <Card key={idx} className="overflow-hidden hover:border-emerald-200 transition-colors">
                                <CardHeader className="bg-slate-50/50 cursor-pointer">
                                    <h3 className="font-bold text-slate-900 text-lg">{faq.q}</h3>
                                </CardHeader>
                                <CardContent className="p-6 text-slate-600 font-medium leading-relaxed">
                                    {faq.a}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-1 space-y-8">
                    <Card className="sticky top-24 border-emerald-100 shadow-xl shadow-emerald-900/5">
                        <CardHeader className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                            <h3 className="font-black text-xl">Still need help?</h3>
                            <p className="text-emerald-50 text-sm font-medium mt-1">Our botanical experts are ready.</p>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Email Support</label>
                                    <p className="text-slate-900 font-bold">support@happyflowers.local</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Phone</label>
                                    <p className="text-slate-900 font-bold">1-800-BOTANY</p>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Hours</label>
                                    <p className="text-slate-600 font-medium">Mon-Fri, 9am - 5pm EST</p>
                                </div>
                            </div>
                            <Button className="w-full shadow-md font-bold text-sm">
                                Contact Support Team
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default HelpCenterPage;

import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import Card, { CardContent, CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";

const AdminSettingsPage = () => {
    const [fulfillmentMethod, setFulfillmentMethod] = useState("BOTH");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const res = await api.get("/public/settings");
            if (res.data) {
                setFulfillmentMethod(res.data.allowedFulfillmentMethod);
            }
        } catch (e) {
            console.error("Failed to load settings", e);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put("/admin/settings", { allowedFulfillmentMethod: fulfillmentMethod });
            alert("Settings updated successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to update settings.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="max-w-4xl mx-auto px-4 py-12 text-center text-slate-500 font-bold">Loading settings...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="space-y-1">
                <h1 className="text-3xl font-black text-slate-900">Store Settings</h1>
                <p className="text-slate-500 font-medium">Manage global operational behaviors and rules.</p>
            </header>

            <Card className="border-emerald-100 shadow-sm">
                <CardHeader className="bg-slate-50 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900">Order Fulfillment</h2>
                </CardHeader>
                <CardContent className="p-8">
                    <form onSubmit={handleSave} className="space-y-8">
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-slate-900 uppercase tracking-widest">
                                Permitted Methods at Checkout
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <label className={`
                                    flex flex-col items-center gap-2 p-6 rounded-xl border-2 transition-all cursor-pointer text-center
                                    ${fulfillmentMethod === 'BOTH'
                                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900'
                                        : 'border-slate-100 bg-slate-50 hover:border-slate-200 text-slate-500'}
                                `}>
                                    <input
                                        type="radio"
                                        value="BOTH"
                                        checked={fulfillmentMethod === "BOTH"}
                                        onChange={(e) => setFulfillmentMethod(e.target.value)}
                                        className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                                    />
                                    <span className="font-bold">Deliver + Collect</span>
                                </label>

                                <label className={`
                                    flex flex-col items-center gap-2 p-6 rounded-xl border-2 transition-all cursor-pointer text-center
                                    ${fulfillmentMethod === 'DELIVERY_ONLY'
                                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900'
                                        : 'border-slate-100 bg-slate-50 hover:border-slate-200 text-slate-500'}
                                `}>
                                    <input
                                        type="radio"
                                        value="DELIVERY_ONLY"
                                        checked={fulfillmentMethod === "DELIVERY_ONLY"}
                                        onChange={(e) => setFulfillmentMethod(e.target.value)}
                                        className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                                    />
                                    <span className="font-bold">Deliver Only</span>
                                </label>

                                <label className={`
                                    flex flex-col items-center gap-2 p-6 rounded-xl border-2 transition-all cursor-pointer text-center
                                    ${fulfillmentMethod === 'PICKUP_ONLY'
                                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900'
                                        : 'border-slate-100 bg-slate-50 hover:border-slate-200 text-slate-500'}
                                `}>
                                    <input
                                        type="radio"
                                        value="PICKUP_ONLY"
                                        checked={fulfillmentMethod === "PICKUP_ONLY"}
                                        onChange={(e) => setFulfillmentMethod(e.target.value)}
                                        className="w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                                    />
                                    <span className="font-bold">Collect Only</span>
                                </label>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex justify-end">
                            <Button type="submit" className="w-[200px]" disabled={saving}>
                                {saving ? "Saving..." : "Save Configuration"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminSettingsPage;

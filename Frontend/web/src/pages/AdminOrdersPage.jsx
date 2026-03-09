import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import Card from "../components/ui/Card";
import { ChevronDown, ChevronUp, Package, MapPin, CreditCard, Truck } from "lucide-react";

const statusStyle = (s) => {
    if (s === "COMPLETED") return "bg-emerald-50 text-emerald-700";
    if (s === "CANCELLED") return "bg-rose-50 text-rose-600";
    if (s === "PROCESSING") return "bg-sky-50 text-sky-700";
    return "bg-amber-50 text-amber-600"; // PAYMENT_PENDING, etc.
};

const paymentStyle = (s) => {
    if (s === "PAID") return "bg-emerald-50 text-emerald-700";
    if (s === "FAILED") return "bg-rose-50 text-rose-600";
    return "bg-amber-50 text-amber-600";
};

const fmt = (cents) => `LKR ${(cents / 100).toLocaleString("en-LK")}`;

const Badge = ({ label, className }) => (
    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wide ${className}`}>
        {label.replace(/_/g, " ")}
    </span>
);

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [updating, setUpdating] = useState(null);

    useEffect(() => { fetchOrders(); }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await api.get("/admin/orders");
            setOrders(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            setUpdating(orderId);
            await api.patch(`/admin/orders/${orderId}/status`, { status: newStatus });
            setOrders(prev =>
                prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o)
            );
        } catch (e) {
            console.error("Failed to update status:", e);
        } finally {
            setUpdating(null);
        }
    };

    const STATUSES = ["PAYMENT_PENDING", "PROCESSING", "COMPLETED", "CANCELLED"];

    const toggle = (id) => setExpanded(prev => (prev === id ? null : id));

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
            <header className="space-y-1">
                <h1 className="text-4xl font-black text-slate-900 leading-tight">Order Management</h1>
                <p className="text-slate-500 font-medium italic">Monitor and manage all customer orders.</p>
            </header>

            {/* Summary bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total", val: orders.length, color: "text-slate-900" },
                    { label: "Pending", val: orders.filter(o => o.orderStatus === "PAYMENT_PENDING").length, color: "text-amber-600" },
                    { label: "Processing", val: orders.filter(o => o.orderStatus === "PROCESSING").length, color: "text-sky-600" },
                    { label: "Completed", val: orders.filter(o => o.orderStatus === "COMPLETED").length, color: "text-emerald-600" },
                ].map(({ label, val, color }) => (
                    <Card key={label} className="p-5 border-slate-100 shadow-sm">
                        <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">{label}</p>
                        <p className={`text-3xl font-black ${color}`}>{val}</p>
                    </Card>
                ))}
            </div>

            {/* Orders table */}
            <Card className="overflow-hidden border-slate-100 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"></th>
                                <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order</th>
                                <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                                <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Items</th>
                                <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                                <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment</th>
                                <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fulfillment</th>
                                <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="9" className="px-6 py-12 text-center text-slate-400 font-medium">
                                        Loading orders...
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="px-6 py-12 text-center text-slate-400 font-medium">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : orders.map((o) => (
                                <React.Fragment key={o.id}>
                                    {/* Main row */}
                                    <tr
                                        className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                                        onClick={() => toggle(o.id)}
                                    >
                                        <td className="px-5 py-4 text-slate-400">
                                            {expanded === o.id
                                                ? <ChevronUp size={16} />
                                                : <ChevronDown size={16} />}
                                        </td>
                                        <td className="px-5 py-4 font-bold text-slate-900 whitespace-nowrap">
                                            #ORD-{o.id}
                                        </td>
                                        <td className="px-5 py-4 text-slate-700 font-medium">{o.userName}</td>
                                        <td className="px-5 py-4 text-slate-500 text-sm">
                                            {o.items?.length ?? 0} {o.items?.length === 1 ? "item" : "items"}
                                        </td>
                                        <td className="px-5 py-4 font-black text-slate-900 text-sm whitespace-nowrap">
                                            {fmt(o.totalCents)}
                                        </td>
                                        <td className="px-5 py-4 space-y-1">
                                            <Badge label={o.paymentMethod} className="bg-slate-100 text-slate-600 block w-fit" />
                                            <Badge label={o.paymentStatus} className={`${paymentStyle(o.paymentStatus)} block w-fit`} />
                                        </td>
                                        <td className="px-5 py-4">
                                            <Badge label={o.fulfillmentMethod} className="bg-slate-100 text-slate-600" />
                                        </td>
                                        <td className="px-5 py-4">
                                            <Badge label={o.orderStatus} className={statusStyle(o.orderStatus)} />
                                        </td>
                                        <td className="px-5 py-4 text-slate-500 text-sm whitespace-nowrap">
                                            {new Date(o.createdAt).toLocaleDateString("en-LK", {
                                                day: "2-digit", month: "short", year: "numeric",
                                            })}
                                        </td>
                                    </tr>

                                    {/* Expanded detail row */}
                                    {expanded === o.id && (
                                        <tr className="bg-slate-50/60">
                                            <td colSpan="9" className="px-8 py-6">
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                                                    {/* Line items */}
                                                    <div className="lg:col-span-2 space-y-3">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                                            <Package size={12} /> Order Items
                                                        </p>
                                                        <div className="rounded-xl overflow-hidden border border-slate-100">
                                                            <table className="w-full text-sm">
                                                                <thead>
                                                                    <tr className="bg-white border-b border-slate-100">
                                                                        <th className="px-4 py-2.5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Plant</th>
                                                                        <th className="px-4 py-2.5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</th>
                                                                        <th className="px-4 py-2.5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit Price</th>
                                                                        <th className="px-4 py-2.5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Line Total</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="divide-y divide-slate-50">
                                                                    {(o.items ?? []).map(item => (
                                                                        <tr key={item.id} className="bg-white">
                                                                            <td className="px-4 py-3 font-semibold text-slate-800">{item.plantName}</td>
                                                                            <td className="px-4 py-3 text-right text-slate-600">{item.qty}</td>
                                                                            <td className="px-4 py-3 text-right text-slate-600">{fmt(item.priceCents)}</td>
                                                                            <td className="px-4 py-3 text-right font-bold text-slate-900">{fmt(item.lineTotalCents)}</td>
                                                                        </tr>
                                                                    ))}
                                                                    <tr className="bg-slate-50">
                                                                        <td colSpan="3" className="px-4 py-3 text-right font-black text-slate-700 text-xs uppercase tracking-widest">
                                                                            Order Total
                                                                        </td>
                                                                        <td className="px-4 py-3 text-right font-black text-emerald-700">
                                                                            {fmt(o.totalCents)}
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>

                                                    {/* Side info */}
                                                    <div className="space-y-5">
                                                        {/* Delivery address */}
                                                        {o.deliveryAddress && (
                                                            <div className="space-y-2">
                                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                                                    <MapPin size={12} /> Delivery Address
                                                                </p>
                                                                <p className="text-sm text-slate-700 leading-relaxed bg-white rounded-xl border border-slate-100 px-4 py-3 whitespace-pre-line">
                                                                    {o.deliveryAddress}
                                                                </p>
                                                            </div>
                                                        )}

                                                        {/* Payment info */}
                                                        <div className="space-y-2">
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                                                <CreditCard size={12} /> Payment
                                                            </p>
                                                            <div className="bg-white rounded-xl border border-slate-100 px-4 py-3 space-y-1.5 text-sm">
                                                                <div className="flex justify-between text-slate-600">
                                                                    <span>Method</span>
                                                                    <span className="font-semibold">{o.paymentMethod?.replace(/_/g, " ")}</span>
                                                                </div>
                                                                <div className="flex justify-between text-slate-600">
                                                                    <span>Status</span>
                                                                    <Badge label={o.paymentStatus} className={paymentStyle(o.paymentStatus)} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Update status */}
                                                        <div className="space-y-2">
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                                                <Truck size={12} /> Update Status
                                                            </p>
                                                            <select
                                                                value={o.orderStatus}
                                                                disabled={updating === o.id}
                                                                onClick={e => e.stopPropagation()}
                                                                onChange={e => updateStatus(o.id, e.target.value)}
                                                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-50"
                                                            >
                                                                {STATUSES.map(s => (
                                                                    <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminOrdersPage;

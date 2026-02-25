import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import Card, { CardContent, CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";

const centsToMoney = (cents) => Number(cents || 0) / 100;

const UserDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders");
        setOrders(res.data);
      } catch (e) {
        console.error("Error fetching orders:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 leading-tight">Hello, {user?.name || "Member"}</h1>
          <p className="text-slate-500 font-medium">Manage your orders and account settings.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm">Edit Profile</Button>
          <Button size="sm">Help Center</Button>
        </div>
      </header>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Your Order History</h2>
          <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
            {orders.length} total orders
          </span>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-100 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <Card key={order.id} className="group transition-all hover:border-emerald-100">
                <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Order ID</p>
                    <p className="text-sm font-bold text-slate-900 font-mono">#{order.id.toString().padStart(6, '0')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Status</p>
                    <p className="text-sm font-bold text-emerald-600">
                      {(order.orderStatus || "PENDING").replace(/_/g, " ")}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mb-2">Items</p>
                      <div className="flex flex-wrap gap-2">
                        {order.items?.map((item, idx) => (
                          <span key={idx} className="bg-white border border-slate-100 px-3 py-1 rounded-lg text-sm text-slate-600 font-medium whitespace-nowrap">
                            {item.plantName} (x{item.qty})
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="w-full md:w-auto h-px md:h-12 md:w-px bg-slate-100" />
                    <div className="text-right flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Grand Total</p>
                      <p className="text-2xl font-black text-slate-900">
                        ${centsToMoney(order.totalCents).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 space-y-4">
            <p className="text-slate-400 font-medium text-lg">You haven't placed any orders yet.</p>
            <Button variant="secondary" onClick={() => (window.location.href = "/catalog")}>
              Browse Plants
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;

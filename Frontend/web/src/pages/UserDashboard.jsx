import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { useAuth } from "../contexts/AuthContext";
import Card, { CardContent, CardHeader } from "../components/ui/Card";
import Button from "../components/ui/Button";

const centsToMoney = (cents) => Number(cents || 0) / 100;
const formatLKR = (amount) => `LKR ${amount.toLocaleString('en-LK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;


const UserDashboard = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, profileRes] = await Promise.all([
          api.get("/orders"),
          api.get("/users/profile").catch(() => null)
        ]);
        setOrders(ordersRes.data);
        if (profileRes) {
          setProfile(profileRes.data);
          setProfileForm({ name: profileRes.data.name || "", phone: profileRes.data.phone || "" });
        }
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 leading-tight">Hello, {user?.name || "Member"}</h1>
          <p className="text-slate-500 font-medium">Manage your orders and account settings.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" size="sm" onClick={() => setIsEditingProfile(true)}>Edit Profile</Button>
          <Button size="sm" onClick={() => (window.location.href = "/help")}>Help Center</Button>
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
                        {formatLKR(centsToMoney(order.totalCents))}
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

      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md shadow-2xl animate-fade-in-up">
            <CardHeader>
              <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={async (e) => {
                e.preventDefault();
                setSavingProfile(true);
                try {
                  const res = await api.put("/users/profile", profileForm);
                  setProfile(res.data);
                  setIsEditingProfile(false);
                  alert("Profile updated successfully! Note: You may need to log out and log back in to see the changes in the toolbar.");
                } catch (err) {
                  alert("Failed to update profile");
                } finally {
                  setSavingProfile(false);
                }
              }} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700">Phone</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                  <Button type="submit" className="flex-1" disabled={savingProfile}>{savingProfile ? "Saving..." : "Save Changes"}</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

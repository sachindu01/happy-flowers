import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Sprout,
  Banknote,
  Users,
  Leaf,
  ClipboardList,
  FileText
} from "lucide-react";
import Card, { CardContent } from "../components/ui/Card";
import { api } from "../api/api";

const AdminDashboard = () => {
  const [data, setData] = useState({
    orders: [],
    plants: [],
    users: [],
    loading: true
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, plantsRes, usersRes] = await Promise.all([
          api.get("/admin/orders"),
          api.get("/admin/plants"),
          api.get("/admin/users")
        ]);

        setData({
          orders: ordersRes.data,
          plants: plantsRes.data,
          users: usersRes.data,
          loading: false
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    fetchDashboardData();
  }, []);

  const totalOrders = data.loading ? "—" : data.orders.length;
  const activePlants = data.loading ? "—" : data.plants.filter(p => p.isActive).length;
  const totalRevenue = data.loading
    ? "—"
    : new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0
    }).format(data.orders.reduce((acc, order) => acc + (order.totalCents || 0), 0) / 100);
  const totalUsers = data.loading ? "—" : data.users.length;

  const stats = [
    { label: "Total Orders", value: totalOrders, icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
    { label: "Active Plants", value: activePlants, icon: Sprout, color: "bg-emerald-50 text-emerald-600" },
    { label: "Revenue", value: totalRevenue, icon: Banknote, color: "bg-amber-50 text-amber-600" },
    { label: "New Customers", value: totalUsers, icon: Users, color: "bg-indigo-50 text-indigo-600" },
  ];

  const tools = [
    { name: "Manage Plants", path: "/admin/plants", desc: "Add, edit or remove products from the catalog.", icon: Leaf },
    { name: "View Orders", path: "/admin/orders", desc: "Review customer orders and fulfillment status.", icon: ClipboardList },
    { name: "Manage Customers", path: "/admin/users", desc: "View and manage registered customer accounts.", icon: Users },
    { name: "Inventory Log", path: "/admin/inventory", desc: "Track stock levels and adjustment history.", icon: FileText },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <header className="space-y-1">
        <h1 className="text-4xl font-black text-slate-900 leading-tight">Admin Console</h1>
        <p className="text-slate-500 font-medium italic">Store overview and management tools.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <Card key={i} className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                <p className="text-2xl font-black text-slate-900">{s.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon size={22} strokeWidth={2.5} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Management Sections */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Store Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool, i) => (
            <Link key={i} to={tool.path} className="group">
              <Card className="h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:border-emerald-500 group-hover:shadow-xl group-hover:shadow-emerald-900/5">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 bg-slate-50 group-hover:bg-emerald-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors">
                    <tool.icon size={24} strokeWidth={2} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{tool.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{tool.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


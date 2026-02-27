import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { Pencil, Trash2, Leaf, PlusCircle, X } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card, { CardContent } from "../components/ui/Card";
import { getFullImageUrl } from "../utils/imageUtils";

const AdminPlantsPage = () => {
  const [plants, setPlants] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", priceCents: 0, stockQty: 0, imageUrl: "", description: "", isActive: true });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/plants");
      setPlants(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/plants/${editingId}`, form);
      } else {
        await api.post("/admin/plants", form);
      }
      setForm({ name: "", category: "", priceCents: 0, stockQty: 0, imageUrl: "", description: "", isActive: true });
      setEditingId(null);
      fetchPlants();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setForm({ ...p });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await api.post("/admin/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ ...form, imageUrl: res.data.url });
    } catch (e) {
      console.error("Upload failed", e);
    } finally {
      setUploading(false);
    }
  };

  const deletePlant = async (id) => {
    if (!window.confirm("Delete this plant?")) return;
    try {
      await api.delete(`/admin/plants/${id}`);
      fetchPlants();
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 leading-tight">Manage Inventory</h1>
          <p className="text-slate-500 font-medium">Add or update plants in your catalog.</p>
        </div>
        <Button variant="secondary" onClick={() => setEditingId(null)} className={!editingId ? 'hidden' : ''}>
          Cancel Edit
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Form Card */}
        <div className="lg:col-span-1 border-r border-slate-100 pr-0 lg:pr-12">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            {editingId ? <Pencil size={20} className="text-emerald-600" /> : <PlusCircle size={20} className="text-emerald-600" />}
            {editingId ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={handleSave} className="space-y-5">
            <Input label="Plant Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" label="Price (Cents)" value={form.priceCents} onChange={(e) => setForm({ ...form, priceCents: e.target.value })} required />
              <Input type="number" label="Stock Qty" value={form.stockQty} onChange={(e) => setForm({ ...form, stockQty: e.target.value })} required />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700">Product Image</label>
              <div className="flex flex-col gap-4">
                {form.imageUrl && (
                  <div className="relative w-full aspect-video rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden group">
                    <img
                      src={getFullImageUrl(form.imageUrl)}
                      alt="Preview"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, imageUrl: "" })}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-xs shadow-sm hover:bg-rose-50 hover:text-rose-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <div className="relative">
                  <input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                  <label
                    htmlFor="image-upload"
                    className={`w-full h-12 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 font-bold text-sm cursor-pointer hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50/50 transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    {uploading ? 'Uploading...' : form.imageUrl ? 'Change Image File' : 'Choose Image File'}
                  </label>
                </div>
                <Input
                  label="Or use image URL"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full h-32 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium text-sm"
              />
            </div>
            <Button type="submit" className="w-full h-[50px] flex items-center justify-center gap-2">
              {editingId ? <Pencil size={18} /> : <PlusCircle size={18} />}
              {editingId ? "Update Product" : "Launch Product"}
            </Button>
          </form>
        </div>

        {/* List Table */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Current Catalog</h2>
          <Card className="overflow-hidden border-slate-100 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Plant</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Price</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock</th>
                    <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-slate-400 font-medium">Loading catalog...</td>
                    </tr>
                  ) : plants.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center text-xs text-slate-400">
                            {p.imageUrl ? (
                              <img src={getFullImageUrl(p.imageUrl)} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <Leaf size={20} className="text-slate-300" />
                            )}
                          </div>
                          <span className="font-bold text-slate-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-[10px] font-black text-slate-500 uppercase">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-black text-slate-900 text-sm">
                        LKR {(p.priceCents / 100).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[11px] font-black uppercase ${p.stockQty > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {p.stockQty > 0 ? `${p.stockQty} in stock` : 'Sold Out'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => handleEdit(p)} className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => deletePlant(p.id)} className="p-2 text-slate-400 hover:text-rose-600 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>

  );
};

export default AdminPlantsPage;

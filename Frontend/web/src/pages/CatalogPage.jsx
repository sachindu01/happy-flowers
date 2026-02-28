import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import PlantCard from '../components/PlantCard';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const CatalogPage = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/plants/categories');
        setCategories(res.data);
      } catch (e) {
        console.error('Error fetching categories:', e);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);
        if (sortBy) params.append('sortBy', sortBy);

        const res = await api.get(`/plants?${params.toString()}`);
        setPlants(res.data);
      } catch (e) {
        console.error('Error fetching plants:', e);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchPlants, 300);
    return () => clearTimeout(timer);
  }, [search, category, sortBy]);


  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
      <header className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl font-black text-slate-900">Plant Catalog</h1>
        <p className="text-slate-500 max-w-2xl">Explore our hand-picked collection of premium Anthuriums. Use filters to find the perfect addition to your home.</p>
      </header>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-end">
        <div className="flex-1 w-full">
          <Input
            label="Search Plants"
            placeholder="e.g. Red Anthurium..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto md:flex md:items-end">
          <div className="space-y-1.5 min-w-[160px]">
            <label className="block text-sm font-semibold text-slate-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="space-y-1.5 min-w-[160px]">
            <label className="block text-sm font-semibold text-slate-700">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 opacity-50 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-slate-200 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : plants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {plants.map((p) => <PlantCard key={p.id} plant={p} />)}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          <p className="text-slate-400 font-medium text-lg">No plants found matching your criteria.</p>
          <Button variant="secondary" className="mt-4" onClick={() => { setSearch(''); setCategory(''); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;

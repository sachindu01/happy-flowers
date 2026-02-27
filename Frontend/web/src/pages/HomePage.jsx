import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import { Truck, BadgeCheck, Headset } from 'lucide-react';
import PlantCard from '../components/PlantCard';
import Button from '../components/ui/Button';

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/plants?limit=6');
        setFeatured(res.data.slice(0, 6));
      } catch (e) {
        console.error('Error fetching featured plants:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center p-20 text-slate-500 font-medium">
      <span className="animate-pulse">Loading featured plants...</span>
    </div>
  );

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-indigo-900 z-0" />
        <div className="absolute inset-0 opacity-20 z-0 bg-[url('https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=2091&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay" />

        <div className="relative z-10 max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
              Bring Nature <br />
              <span className="text-emerald-400">To Your Home</span>
            </h1>
            <p className="text-xl text-emerald-50/80 max-w-xl mx-auto font-medium">
              Exquisite Anthurium plants hand-picked for their beauty and longevity.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" onClick={() => window.location.href = '/catalog'}>
              Shop Collection
            </Button>
            <Button variant="secondary" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
              Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900">Featured Varieties</h2>
            <div className="h-1 w-20 bg-emerald-500 rounded-full" />
          </div>
          <Button variant="secondary" size="sm" onClick={() => window.location.href = '/catalog'}>
            View All →
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p) => <PlantCard key={p.id} plant={p} />)}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
              <Truck size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900">Island-wide Delivery</h3>
              <p className="text-slate-500 text-sm">Safe and climate-controlled transport for your delicate plants.</p>
            </div>
          </div>
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
              <BadgeCheck size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900">Premium Quality</h3>
              <p className="text-slate-500 text-sm">Every plant is inspected for health and vibrant blooming.</p>
            </div>
          </div>
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
              <Headset size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900">Expert Support</h3>
              <p className="text-slate-500 text-sm">Free consultation on plant care and maintenance tips.</p>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
};

export default HomePage;

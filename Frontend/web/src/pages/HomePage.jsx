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
            <Button variant="secondary" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm" onClick={() => document.getElementById('our-story').scrollIntoView({ behavior: 'smooth' })}>
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

      {/* Our Story Section */}
      <section id="our-story" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16 space-y-4">
          <span className="text-emerald-600 font-semibold tracking-widest uppercase text-sm">Who We Are</span>
          <h2 className="text-4xl font-black text-slate-900">Our Story</h2>
          <div className="h-1 w-20 bg-emerald-500 rounded-full mx-auto" />
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            A passion for rare anthuriums — grown with love on the island's verdant slopes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left – image collage */}
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-indigo-900" />
            <div
              className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60 mix-blend-overlay"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <p className="text-white font-bold text-lg">Founded 2018</p>
                <p className="text-emerald-200 text-sm">Kandy, Sri Lanka</p>
              </div>
            </div>
          </div>

          {/* Right – timeline */}
          <div className="space-y-10">
            {[
              {
                year: '2018',
                title: 'The Spark',
                body: 'It started with a single Anthurium andraeanum gifted to our founder Sachindu by his grandmother. Its heart-shaped bloom, a brilliant waxy red, captivated him and sparked a lifelong obsession with tropical aroids.',
              },
              {
                year: '2020',
                title: 'The Nursery',
                body: 'What began on a backyard shelf grew into a proper nursery nestled in the cool hills of Kandy. We started experimenting with rare varieties — velvet-leafed clarinerviums, spotted crystallinums, and multicoloured Tulip hybrids.',
              },
              {
                year: '2023',
                title: 'Going Online',
                body: 'Demand from plant lovers across the island pushed us to build Happy Flowers — a curated online shop that brings hand-inspected, premium anthuriums directly to your door, anywhere in Sri Lanka.',
              },
              {
                year: 'Today',
                title: 'Growing Together',
                body: "We now maintain over 40 varieties and partner with collectors island-wide. Every plant that leaves our nursery comes with personal care advice, because we believe the relationship doesn\u2019t end at checkout.",
              },
            ].map(({ year, title, body }, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                    {year === 'Today' ? year : year.slice(2)}
                  </div>
                  {i < 3 && <div className="w-px flex-1 bg-emerald-100 mt-2" />}
                </div>
                <div className="pb-6">
                  <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-1">{year}</p>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>

  );
};

export default HomePage;

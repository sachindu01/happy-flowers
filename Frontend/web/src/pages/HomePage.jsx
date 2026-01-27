import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/api';
import PlantCard from '../components/PlantCard';

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/api/plants?limit=6');
        setFeatured(res.data.slice(0, 6));
      } catch (e) {
        console.error('Error fetching featured plants:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page">
      <section className="hero">
        <h1>Welcome to Happy Flowers</h1>
        <p>Discover beautiful anthurium plants for your home and garden</p>
        <Link to="/catalog" className="btn btn-primary">Browse Catalog</Link>
      </section>

      <section className="featured">
        <h2>Featured Plants</h2>
        <div className="plant-grid">
          {featured.map((p) => <PlantCard key={p.id} plant={p} />)}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

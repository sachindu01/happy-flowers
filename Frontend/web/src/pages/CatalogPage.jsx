import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import PlantCard from '../components/PlantCard';

const CatalogPage = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);
        if (sortBy) params.append('sortBy', sortBy);

        const res = await api.get(`/api/plants?${params.toString()}`);
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

  const categories = [...new Set(plants.map((p) => p.category))];

  return (
    <div className="page">
      <h1>Plant Catalog</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search plants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
          <option value="">All Categories</option>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input">
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="plant-grid">
          {plants.map((p) => <PlantCard key={p.id} plant={p} />)}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;

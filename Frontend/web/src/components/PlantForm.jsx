import React, { useState } from 'react';
import { api } from '../api/api';

const PlantForm = ({ plant, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: plant.name || '',
    description: plant.description || '',
    category: plant.category || '',
    price: plant.price || 0,
    stockQty: plant.stockQty || 0,
    isActive: plant.isActive !== undefined ? plant.isActive : true,
    imageUrl: plant.imageUrl || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (plant.id) {
        await api.put(`/admin/plants/${plant.id}`, formData);
      } else {
        await api.post('/admin/plants', formData);
      }
      onSave();
    } catch (e) {
      alert('Failed to save plant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{plant.id ? 'Edit Plant' : 'Add New Plant'}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="input"
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="input"
          />

          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="input"
          />

          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
            className="input"
          />

          <input
            type="number"
            placeholder="Stock Quantity"
            value={formData.stockQty}
            onChange={(e) => setFormData({ ...formData, stockQty: parseInt(e.target.value) })}
            required
            className="input"
          />

          <input
            type="text"
            placeholder="Image URL (optional)"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            className="input"
          />

          <label>
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />
            Active
          </label>

          <div className="modal-actions">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlantForm;

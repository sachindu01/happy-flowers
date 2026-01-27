import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import PlantForm from "../components/PlantForm";
import placeholderImg from "../assets/placeholder.jpg";

const AdminPlantsPage = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPlant, setEditingPlant] = useState(null);

  useEffect(() => {
    fetchPlants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPlants = async () => {
    try {
      const res = await api.get("/api/plants");
      setPlants(res.data);
    } catch (e) {
      console.error("Error fetching plants:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this plant?")) return;
    try {
      await api.delete(`/api/admin/plants/${id}`);
      fetchPlants();
    } catch (e) {
      alert("Failed to delete plant");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Manage Plants</h1>
        <button onClick={() => setEditingPlant({})} className="btn btn-primary">
          Add New Plant
        </button>
      </div>

      {editingPlant && (
        <PlantForm
          plant={editingPlant}
          onClose={() => setEditingPlant(null)}
          onSave={() => {
            setEditingPlant(null);
            fetchPlants();
          }}
        />
      )}

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {plants.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={p.imageUrl || placeholderImg}
                    alt={p.name || "Plant"}
                    onError={(e) => {
                      e.currentTarget.src = placeholderImg;
                    }}
                    style={{
                      width: 56,
                      height: 56,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                </td>

                <td>{p.name}</td>
                <td>{p.category}</td>

                {/* If you switched to cents, use p.priceCents here instead */}
                <td>${Number(p.price || 0).toFixed(2)}</td>

                <td>{p.stockQty}</td>
                <td>{p.isActive ? "✓" : "✗"}</td>
                <td>
                  <button onClick={() => setEditingPlant(p)} className="btn btn-sm">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPlantsPage;

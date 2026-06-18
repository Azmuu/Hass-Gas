 import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminService() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    iconFile: null, // store selected file
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const axiosAuth = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchServices = async () => {
    if (!token) return setMessage("❌ Missing token. Please login again.");
    setLoading(true);
    try {
      const res = await axiosAuth.get("/services");
      setServices(res.data.sort((a, b) => a.id - b.id));
    } catch (err) {
      console.error("Error fetching services", err);
      setMessage("❌ Failed to fetch services.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return setMessage("❌ Missing token. Please login again.");

    if (!form.title.trim() || !form.description.trim()) {
      setMessage("❌ Title and Description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title.trim());
    formData.append("description", form.description.trim());

    if (form.iconFile) {
      formData.append("icon", form.iconFile);
    }

    setSubmitting(true);
    try {
      if (editingId) {
        await axiosAuth.put(`/services/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("✅ Service updated!");
      } else {
        await axiosAuth.post("/services", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("✅ Service added!");
      }

      setForm({ title: "", description: "", iconFile: null });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save service.");
    }
    setSubmitting(false);
  };

  const handleEdit = (service) => {
    setForm({
      title: service.title || "",
      description: service.description || "",
      iconFile: null, // cannot prefill file input
    });
    setEditingId(service.id);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!token) return setMessage("❌ Missing token.");
    if (window.confirm("Delete this service?")) {
      try {
        await axiosAuth.delete(`/services/${id}`);
        fetchServices();
        setMessage("✅ Service deleted.");
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to delete.");
      }
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4 text-cyan-700">Manage Services</h2>

      {message && (
        <div
          className={`mb-4 font-medium ${
            message.startsWith("❌") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow mb-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <label className="block font-semibold mb-1">Upload Icon Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, iconFile: e.target.files ? e.target.files[0] : null })
          }
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 disabled:opacity-50"
        >
          {submitting ? "Saving..." : editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      {loading ? (
        <p>🔄 Loading services...</p>
      ) : (
        <div className="grid gap-4">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div className="flex gap-4 items-center">
                {/* Show icon image from backend */}
                {s.icon ? (
                  <img
                    src={`http://localhost:8000/images/${s.icon}`}
                    alt={s.title}
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded" />
                )}

                <div>
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="text-gray-600">{s.description}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(s)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

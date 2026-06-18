import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBranchesPage() {
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    photo: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchBranches = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/branches", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBranches(res.data);
    } catch (err) {
      console.error("Error fetching branches", err);
      setMessage("❌ Failed to fetch branches.");
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("address", form.address);
    formData.append("phone", form.phone);
    if (form.photo) {
      formData.append("photo", form.photo);
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8000/api/branches/${editingId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("✅ Branch updated!");
      } else {
        await axios.post("http://localhost:8000/api/branches", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage("✅ Branch added!");
      }

      setForm({ name: "", address: "", phone: "", photo: null });
      setEditingId(null);
      fetchBranches();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save branch.");
    }
  };

  const handleEdit = (branch) => {
    setForm({
      name: branch.name,
      address: branch.address,
      phone: branch.phone,
      photo: branch.photo,
    });
    setEditingId(branch.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      try {
        await axios.delete(`http://localhost:8000/api/branches/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchBranches();
        setMessage("✅ Branch deleted.");
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to delete branch.");
      }
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4 text-cyan-700">Manage Branches</h2>

      {message && <div className="mb-4 text-green-600 font-medium">{message}</div>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow-md mb-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Branch Name"
          className="w-full p-2 border rounded"
          value={form.name}
          onChange={(e) => {
            const value = e.target.value;
            if (/^[a-zA-Z\s]*$/.test(value)) {
              setForm({ ...form, name: value });
            }
          }}
          required
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full p-2 border rounded"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          value={form.phone}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setForm({ ...form, phone: value });
            }
          }}
          required
        />
        <input
          type="file"
          accept="image/*"
          className="w-full p-2 border rounded"
          onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}
        />
        <button
          type="submit"
          className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
        >
          {editingId ? "Update Branch" : "Add Branch"}
        </button>
      </form>

      <div className="grid gap-4">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div className="flex gap-4 items-center">
              {branch.photo && (
                <img
                  src={`http://localhost:8000/images/${branch.photo}`}
                  alt={branch.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{branch.name}</h3>
                <p className="text-gray-600">{branch.address}</p>
                <p className="text-gray-600">{branch.phone}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(branch)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(branch.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

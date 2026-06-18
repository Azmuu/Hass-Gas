import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    p_name: "",
    sizeKg: "",
    price: "",
    photo: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    if (!token) {
      setMessage("❌ Unauthorized. Please log in.");
      return;
    }

    try {
      const res = await axios.get("http://localhost:8000/api/cylinders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
      if (err.response?.status === 403) {
        setMessage("❌ You are not authorized to view this content.");
      } else {
        setMessage("❌ Failed to fetch products.");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("❌ Unauthorized. Please log in.");
      return;
    }

    // Validate product name (only letters and spaces)
    if (!/^[A-Za-z\s]+$/.test(form.p_name)) {
      setMessage("❌ Product Name should only contain letters and spaces.");
      return;
    }

    // Validate sizeKg and price are positive numbers
    if (isNaN(form.sizeKg) || Number(form.sizeKg) <= 0) {
      setMessage("❌ Size must be a positive number.");
      return;
    }
    if (isNaN(form.price) || Number(form.price) <= 0) {
      setMessage("❌ Price must be a positive number.");
      return;
    }

    const formData = new FormData();
    formData.append("p_name", form.p_name);
    formData.append("sizeKg", form.sizeKg);
    formData.append("price", form.price);
    if (form.photo) {
      formData.append("photo", form.photo);
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/cylinders/${editingId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage("✅ Product updated!");
      } else {
        await axios.post("http://localhost:8000/api/cylinders", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage("✅ Product added!");
      }

      setForm({ p_name: "", sizeKg: "", price: "", photo: null });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save product.");
    }
  };

  const handleEdit = (product) => {
    setForm({
      p_name: product.p_name,
      sizeKg: product.sizeKg,
      price: product.price,
      photo: null,
    });
    setEditingId(product.id);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!token) {
      setMessage("❌ Unauthorized. Please log in.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8000/api/cylinders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchProducts();
        setMessage("✅ Product deleted.");
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to delete product.");
      }
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4 text-cyan-700">Manage Products</h2>

      {message && (
        <div
          className={`mb-4 font-medium ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow-md mb-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          value={form.p_name}
          onChange={(e) => {
            const value = e.target.value;
            // Allow only letters and spaces
            if (/^[A-Za-z\s]*$/.test(value)) {
              setForm({ ...form, p_name: value });
              setMessage("");
            }
          }}
          required
        />
        <input
          type="number"
          placeholder="Size in KG"
          min="0"
          className="w-full p-2 border rounded"
          value={form.sizeKg}
          onChange={(e) => setForm({ ...form, sizeKg: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          min="0"
          className="w-full p-2 border rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
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
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div className="flex gap-4 items-center">
              {product.photo && (
                <img
                  src={`http://localhost:8000/images/${product.photo}`}
                  alt={product.p_name}
                  className="w-20 h-20 object-cover rounded-md"
                />
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.p_name}
                </h3>
                <p className="text-gray-600">Size: {product.sizeKg} kg</p>
                <p className="text-gray-600">Price: ${product.price}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
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

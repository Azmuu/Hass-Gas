import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    branch: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8000/api/cylinders")
      .then(res => setProducts(res.data))
      .catch(err => console.error("❌ Error fetching products:", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/api/branches")
      .then(res => setBranches(res.data))
      .catch(err => console.error("❌ Error fetching branches:", err));
  }, []);

  const handleQuantityChange = (productId, quantity) => {
    setSelectedItems(prev => {
      const updated = [...prev];
      const index = updated.findIndex(item => item.cylinderId === productId);
      if (index !== -1) {
        if (quantity === 0) {
          updated.splice(index, 1);
        } else {
          updated[index].quantity = quantity;
        }
      } else if (quantity > 0) {
        updated.push({ cylinderId: productId, quantity });
      }
      return updated;
    });
  };

  const calculateTotal = () => {
    return selectedItems.reduce((sum, item) => {
      const product = products.find(p => p.id === item.cylinderId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ You must be logged in to place an order");
      return;
    }

    if (!formData.branch || selectedItems.length === 0) {
      alert("❌ Fadlan buuxi foomka oo dooro alaabo");
      return;
    }

    const orderPayload = {
      branchId: parseInt(formData.branch),
      fullName: formData.name,
      phone: formData.phone,
      address: formData.address,
      items: selectedItems.map(item => ({
        cylinderId: item.cylinderId,
        quantity: item.quantity || 1
      }))
    };

    console.log("📦 Order Payload:", orderPayload);

    try {
      await axios.post("http://localhost:8000/api/orders", orderPayload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Dalabkaaga waa la helay!");
      setFormData({ name: '', phone: '', address: '', branch: '' });
      setSelectedItems([]);
      setShowModal(false);
      setMessage('');
    } catch (err) {
      console.error("❌ Order failed:", err);
      setMessage("❌ Dalabka wuu fashilmay. Fadlan isku day mar kale.");
    }
  };

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto min-h-screen bg-gray-50">
      <h2 className="text-4xl font-bold mb-10 text-center text-cyan-700">Alaabooyinka Gaaska</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden p-4">
            <img
              src={`http://localhost:8000/images/${item.photo}`}
              alt={item.p_name}
              className="w-48 h-48 object-cover mx-auto"
            />
            <h3 className="text-xl font-bold text-gray-800 mt-2 text-center">{item.p_name}</h3>
            <p className="text-center text-cyan-600 font-semibold">${item.price}</p>
            <input
              type="number"
              min="0"
              placeholder="Tirada"
              className="mt-2 w-full border p-2 rounded-lg"
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value) || 0)
              }
            />
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => setShowModal(true)}
          className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-cyan-700"
        >
          Dalbo Alaab
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-cyan-700 mb-4">Dalbo Alaab</h2>
            {message && <p className="text-red-600 mb-4">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                required
              >
                <option value="">-- Xulo Laan --</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>{branch.name}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Magacaaga"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="tel"
                placeholder="Telefoonka"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Cinwaanka"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />

              <input
                type="text"
                value={`Wadar Qiime: $${calculateTotal()}`}
                className="w-full p-2 border bg-gray-100 text-gray-600 rounded-lg"
                disabled
              />

              <div className="flex justify-between gap-4 pt-2">
                <button type="submit" className="flex-1 bg-green-500 text-white py-2 rounded-lg font-bold">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setMessage('');
                  }}
                  className="flex-1 bg-red-400 text-white py-2 rounded-lg font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

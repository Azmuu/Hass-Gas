import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Handle approve order action
  const handleApprove = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:8000/api/orders/${orderId}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update order status locally after approval
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, status: "Approved" } : order
        )
      );
    } catch (err) {
      alert("Failed to approve order");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading orders...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-cyan-700">
        Maamulka Dalabyada
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">Ma jiraan dalabyo.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="border rounded-xl shadow p-6 bg-white"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold text-lg">
                    Magaca Macmiilka: {order.customerFullName || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Taleefan: {order.customerPhone || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Cinwaan: {order.customerAddress || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Laan: {order.branchName || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Taariikhda Dalabka:{" "}
                    {new Date(order.orderTime).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 font-semibold">
                    Status:{" "}
                    <span
                      className={`${
                        order.status === "Approved"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-800 font-bold">
                    Wadar Qiimaha: ${order.totalPrice?.toFixed(2) || "0.00"}
                  </p>
                </div>

                <button
                  disabled={order.status === "Approved"}
                  onClick={() => handleApprove(order.orderId)}
                  className={`px-4 py-2 rounded-md font-semibold text-white ${
                    order.status === "Approved"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {order.status === "Approved" ? "La Ansixiyey" : "Ansixi"}
                </button>
              </div>

              {/* Ordered Products */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b p-2">Sawirka</th>
                      <th className="border-b p-2">Magaca Alaabta</th>
                      <th className="border-b p-2">Tirada</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-2">
                          <img
                            src={item.Photo}
                            alt={item.productName}
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="p-2">{item.productName}</td>
                        <td className="p-2">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;

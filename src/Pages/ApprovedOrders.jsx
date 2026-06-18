import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovedOrders = () => {
  const [approvedOrders, setApprovedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const filtered = res.data.filter((order) => order.status === "Approved");
        setApprovedOrders(filtered);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch approved orders");
        setLoading(false);
      }
    };

    fetchApprovedOrders();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading approved orders...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-green-700">
        Dalabyada la Ansixiyey
      </h1>

      {approvedOrders.length === 0 ? (
        <p className="text-center text-gray-600">Wali lama ansixin wax dalab ah.</p>
      ) : (
        <div className="space-y-6">
          {approvedOrders.map((order) => (
            <div
              key={order.orderId}
              className="border rounded-xl shadow p-6 bg-white"
            >
              <div className="mb-4">
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
                <p className="text-sm text-green-600 font-semibold">
                  Status: {order.status}
                </p>
                <p className="text-sm text-gray-800 font-bold">
                  Wadar Qiimaha: ${order.totalPrice?.toFixed(2) || "0.00"}
                </p>
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

export default ApprovedOrders;

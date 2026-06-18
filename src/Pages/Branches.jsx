import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/branches");
        setBranches(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch branches:", err);
        setError("Failed to load branches.");
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-center text-cyan-700">Our Branches</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={`http://localhost:8000/images/${branch.photo}`} // adjust if image path is different
              alt={branch.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{branch.name}</h3>
                <p className="text-gray-600 mb-1">📍 {branch.address}</p>
                <p className="text-gray-600">📞 {branch.phone}</p>
              </div>
              <Link
                to="/products"
                className="mt-4 inline-block bg-cyan-500 hover:bg-cyan-600 text-white text-center font-bold py-2 px-4 rounded-lg transition"
              >
                View Products
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Branches;

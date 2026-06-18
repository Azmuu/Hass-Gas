// ✅ AuthPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct named import

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const url = isLogin
        ? "http://localhost:8000/auth/login"
        : "http://localhost:8000/auth/register";

      const res = await axios.post(url, form);

      if (isLogin) {
        const token = res.data.token;
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        const role = decoded.role || "ROLE_USER";
        localStorage.setItem("role", role);

        console.log("Logged in as:", decoded.sub, "with role:", role);
        setMessage("✅ Login successful!");

        navigate("/dashboard");
        window.updateLoginStatus && window.updateLoginStatus();
      } else {
        setMessage("✅ Registration successful!");
      }

      setForm({ username: "", password: "" });
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "❌ Something went wrong.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-cyan-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-cyan-600">
          {isLogin ? "Login" : "Register"}
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm text-red-500">{message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-xl"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-xl"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-cyan-600 text-white py-2 rounded-xl hover:bg-cyan-700"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-600 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
              setForm({ username: "", password: "" });
            }}
            className="ml-2 text-cyan-600 font-semibold text-sm hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

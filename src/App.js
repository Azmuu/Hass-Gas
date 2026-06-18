import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";

// Public Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Service";
import Products from "./Pages/Products";
import Contact from "./Pages/Contact";
import AddToCart from "./Pages/AddToCart";
import Branches from "./Pages/Branches";
import AuthPage from "./Pages/auth";

// User/Admin Shared Page
import Dashboard from "./Pages/Dashboard";

// Admin Pages
import AdminBranchesPage from "./Pages/AdminBranches";
import AdminService from "./Pages/AdminService";
import AdminProductsPage from "./Pages/AdminProducts";
import AdminOrders from "./Pages/AdminOrders";
import ApprovedOrders from "./Pages/ApprovedOrders";

// Optional: Not Found Page
import NotFound from "./Pages/NotFound"; // Create one if not existing
import AdminUsers from "./Pages/AdminUsers";

const App = () => {
  return (
    <div className="bg-slate-50 min-h-screen text-gray-800">
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/login" element={<AuthPage />} />

        {/* Protected Dashboard (All authenticated users) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin-only Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminBranchesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/approveOrders"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <ApprovedOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        {/* Fallback route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
};


export default App;

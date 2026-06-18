import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // ROLE_ADMIN or ROLE_USER or null

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const isAdmin = role === "ROLE_ADMIN";
  const isUser = role === "ROLE_USER";

  if (!role) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600">⚠️ No role found. Please login.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex pt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md h-full">
        <div className="p-6 font-bold text-xl border-b">
          {isAdmin ? "Admin Dashboard" : "User Dashboard"}
        </div>
        <nav className="mt-6">
          <ul>
            {isAdmin && (
              <>
                <SidebarLink to="/admin" label="Manage Branches" />
                <SidebarLink to="/admin/services" label="Manage Services" />
                <SidebarLink to="/admin/products" label="Manage Products" />
                <SidebarLink to="/admin/orders" label="Manage Orders" />
                <SidebarLink to="/admin/approveOrders" label="Approve Orders" />
                   <SidebarLink to="admin/users" label="Manage users" />

              </>
            )}

            {(isAdmin || isUser) && (
              <SidebarLink to="/products" label="Order Products" />
            )}

           
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Welcome to your dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DashboardCard title="Users" value="1,234" />
          <DashboardCard title="Sales" value="$12,345" />
          <DashboardCard title="Orders" value="567" />
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ to, label }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `block px-6 py-3 rounded transition ${
            isActive
              ? "bg-cyan-100 font-semibold"
              : "hover:bg-gray-200 text-gray-700"
          }`
        }
      >
        {label}
      </NavLink>
    </li>
  );
}

function DashboardCard({ title, value }) {
  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}


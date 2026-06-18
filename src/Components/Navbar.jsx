import React, { useState } from 'react';
import { useOrder } from "../Context/OrderContext";
import { ShoppingCart, Menu, X } from 'lucide-react';
import logo from "../images/logo.jpg";
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { orders } = useOrder();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // initially false
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // ✅ Only set to true *after* login success
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    // But don’t auto login — let it stay false unless login confirmed
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // Let login page update it after success
  window.updateLoginStatus = () => setIsLoggedIn(true);

  return (
    <div>
      <nav className="flex justify-between items-center px-6 py-4 bg-cyan-600 text-white shadow-md fixed top-0 w-full z-50">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Hass Gass Logo" className="w-10 h-10 rounded-full object-cover" />
          <h1 className="text-2xl font-bold tracking-wide">HASS GASS</h1>
        </div>

        <div className="hidden md:flex gap-6 items-center text-lg">
          <NavLink to="/" className="hover:underline">Home</NavLink>
          <NavLink to="/about" className="hover:underline">About</NavLink>
          <NavLink to="/services" className="hover:underline">Services</NavLink>
          <NavLink to="/branches" className="hover:underline">Branches</NavLink>
          <NavLink to="/contact" className="hover:underline">Contact</NavLink>

          {isLoggedIn ? (
            <>
              <NavLink to="/dashboard" className="hover:underline">Dashboard</NavLink>
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          ) : (
            <NavLink to="/login" className="hover:underline">Login</NavLink>
          )}

          <NavLink to="/addtocart">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {orders.length}
              </span>
            </div>
          </NavLink>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

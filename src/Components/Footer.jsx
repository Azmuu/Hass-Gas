import React from 'react';
import { Phone, MapPin, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
   <footer className="bg-cyan-600 text-white py-10 px-0 w-full">
  <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center space-y-6">

        {/* Logo / Title */}
        <h2 className="text-2xl font-bold tracking-wide">HASS GASS</h2>

        {/* Contact Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-center gap-2">
            <Phone size={18} className="text-white" />
            <span>Wac: 6666</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MapPin size={18} className="text-white" />
            <span>Xarunta: HASS Petroleum, Muqdisho</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail size={18} className="text-white" />
            <span>info@hassgass.com</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5">
          <a href="#" className="hover:text-gray-200 transition duration-200">
            <Facebook size={20} />
          </a>
          <a href="#" className="hover:text-gray-200 transition duration-200">
            <Twitter size={20} />
          </a>
          <a href="#" className="hover:text-gray-200 transition duration-200">
            <Instagram size={20} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-white/80">
          &copy; {new Date().getFullYear()} HASS GASS. Xuquuqda way xafidan tahay.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

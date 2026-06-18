import React from 'react';
import About from './About';
import Services from './Service';
import Contact from './Contact';
import Products from './Products';
import Branches from './Branches';
import image from '../images/logo.jpg';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="pt-20 bg-white min-h-screen px-6 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 py-12">
        <motion.div
          className="text-center md:text-left md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-700">HASS GASS</h1>
          <p className="text-xl font-medium mb-4 text-gray-700">BADBAADO, FUDEYD IYO HEERKA GAASTA OO MUUQDA</p>
          <p className="text-gray-600 mb-6">Ka doono xarumaha HASS PETROLEUM ama wac 6666 si aad u hesho adeeg degdeg ah!</p>
          <a
            href="tel:6666"
            className="inline-block text-red-600 bg-cyan-400 hover:bg-cyan-500 text-black font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Wac 6666
          </a>
        </motion.div>
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={image}
            alt="Hass Gass"
            className="rounded-xl shadow-xl w-full max-w-md object-cover"
          />
        </motion.div>
      </section>

      {/* Pages-ka kale oo isku dhafan */}
      <About />
      <Services />
     <Branches />
      <Products />
      <Contact />
      
    </div>
  );
};

export default Home;

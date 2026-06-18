import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <motion.div
      className="pt-24 px-6 min-h-screen bg-gray-50"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-4xl font-bold text-cyan-700 mb-4 text-center">Nala Soo Xiriir</h2>
        <p className="text-center text-gray-600 mb-6">
          Si aad noola soo xiriirto, fadlan wac <span className="font-semibold text-black">6666</span> ama buuxi foomka hoose.
        </p>
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Magacaaga</label>
            <input
              type="text"
              placeholder="Magacaaga"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-cyan-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Emailkaaga</label>
            <input
              type="email"
              placeholder="Emailkaaga"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Fariintaada</label>
            <textarea
              placeholder="Fariintaada"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-6 py-3 rounded-lg w-full transition"
          >
            Dir Fariin
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Contact;

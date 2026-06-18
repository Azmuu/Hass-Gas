import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  return (
    <motion.div
      className="pt-24 px-6 bg-gray-50 min-h-screen"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Our Services</h2>
        <p className="text-gray-600 mb-12 text-lg">
          Waxaan ku faaneynaa inaan kuu keeno adeegyo tayo sare leh oo ammaan ah, si sahlan oo degdeg ah.
        </p>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            // Backend icon filename, e.g. "abc123.svg"
            const iconFilename = service.icon;

            return (
              <motion.div
                key={service.id || index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4 flex justify-center">
                  {iconFilename ? (
                    <img
                      src={`http://localhost:8000/images/${iconFilename}`}
                      alt={service.title + " icon"}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    // fallback icon or empty placeholder
                    <div className="w-12 h-12 bg-gray-300 rounded" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-cyan-700 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default Services;

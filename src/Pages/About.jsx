import React from 'react';
import { motion } from 'framer-motion';
import image from "../images/4.jpg";

const About = () => {
  return (
    <motion.div
      className="pt-24 px-6 bg-gray-50 min-h-screen"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold text-cyan-700 mb-8 text-center">About Us</h2>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 pt-12 px-4 md:px-0">

        {/* Text Section */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-cyan-700 mb-6">Hass Gass</h2>
          <ol className="list-decimal list-inside text-gray-700 text-base space-y-2 mb-6">
            <li>Gaas tayo sare leh oo badbaado leh.</li>
            <li>Degdeg u yimaada gurigaaga.</li>
            <li>La qaadi karo oo la isku halayn karo.</li>
          </ol>
          <a
            href="tel:6666"
            className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 px-5 rounded-lg transition duration-300"
          >
            Wac Hadda - 6666
          </a>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={image}
            alt="Hass Gass About"
            className="rounded-xl shadow-lg w-full md:w-64 object-cover"
          />
        </div>
      </div>

      {/* Qoraal dheeriga ah - Our Mission, Vision, Products */}
      <div className="max-w-5xl mx-auto mt-16 space-y-12 text-lg text-gray-700 leading-relaxed px-4 md:px-0">

        {/* Our Mission */}
        <div>
          <h3 className="text-2xl font-bold text-cyan-600 mb-4">Our Mission</h3>
          <p>
            Ujeedada <strong>Hass Gass</strong> waa in macaamiisha Soomaaliyeed loo siiyo adeeg gaas iyo qalab la isku halleyn karo, oo ammaan ah, qiime jaban, iyo adeeg macaamiil heer sare ah.
            Waxaan rabnaa in aan fududeyno helitaanka gaaska tayada leh gudaha iyo banaanka Muqdisho.
          </p>
        </div>

        {/* Our Vision */}
        <div>
          <h3 className="text-2xl font-bold text-cyan-600 mb-4">Our Vision</h3>
          <p>
            Waxaan aragnaa mustaqbal ay dhammaan qoysaska Soomaaliyeed heli karaan gaas tayo sare leh oo ku habboon nolol maalmeedkooda, iyadoo la ilaalinayo deegaanka iyo badbaadada bulshada.
            Waxaan rabnaa in aan noqono <strong>hogaamiyaha suuqyada gaaska</strong> ee Soomaaliya.
          </p>
        </div>

        {/* Our Products */}
        <div>
          <h3 className="text-2xl font-bold text-cyan-600 mb-4">Our Products</h3>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>Haamaha gaaska - 6kg, 12kg, 15kg iyo kuwa kale</li>
            <li>Burnooyinka wax lagu karsado ee tayo sare leh</li>
            <li>Tuubooyinka gaaska iyo qalabka ilaalinta</li>
            <li>Qalabka badbaadada - regulators, valves, iwm</li>
            <li>Qalabyo iyo agabyo kale oo la xiriira isticmaalka gaaska</li>
          </ul>
        </div>

      </div>
    </motion.div>
  );
};

export default About;

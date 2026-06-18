// src/index.js ama src/main.jsx
import './index.css';


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { OrderProvider } from "./Context/OrderContext"; // <- HUBI

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <OrderProvider> {/* <- KU DAR Provider-KA Halkan */}
        <App />
      </OrderProvider>
    </BrowserRouter>
  </React.StrictMode>
);

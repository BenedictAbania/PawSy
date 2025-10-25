import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CartPage from "./Components/CartPage";
import Checkout_Address from "./Components/Checkout_Address";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to cart so the app isn't blank at / */}
        <Route path="/" element={<Navigate to="/cart" replace />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout_Address />} />
        {/* any unknown route -> cart */}
        <Route path="*" element={<Navigate to="/cart" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Shop from "./pages/Shop";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Account from "./pages/Account";
import EditProfile from "./pages/EditProfile";
import CartPage from "./pages/CartPage";
import CheckoutAddress from "./pages/Checkout_Address";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment"; 

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/account" element={<Account />} />
        {/* --- New Checkout Flow Routes --- */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutAddress />} />
        <Route path="/shipping" element={<Shipping />} /> 
        <Route path="/payment" element={<Payment />} />

        {/* You'll need to create this page next */}
        <Route path="/confirmation" element={<div>Order Confirmation Page</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
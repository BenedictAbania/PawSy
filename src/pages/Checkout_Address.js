import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Checkout-Address.css";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faClock } from "@fortawesome/free-regular-svg-icons";

const formatCurrency = (v) => `$${Number(v).toFixed(2)}`;
const estimatedDelivery = (daysFromNow = 9) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
};

const initialAddresses = [
  {
    name: "Huzefa Bagwala",
    label: "HOME",
    address: "1131 Dusty Townline, Jacksonville, TX 40322",
    contact: "(+936) 361-0310",
  },
  {
    name: "IndiaTech",
    label: "OFFICE",
    address: "1219 Harvest Path, Jacksonville, TX 40326",
    contact: "(+936) 361-0310",
  },
];

export default function CheckoutAddress() {
  const location = useLocation();
  const navigate = useNavigate();
  const passedCart = (location.state && location.state.cartItems) || [];
  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const price = passedCart.length
    ? passedCart.reduce((s, i) => s + i.price * i.quantity, 0)
    : 319.98;
  const discount = price * 0.1;
  const total = price - discount;

  function removeAddress(idx) {
    setAddresses((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      if (selectedIdx >= next.length) setSelectedIdx(Math.max(0, next.length - 1));
      return next;
    });
  }

  function editAddress(idx) {
    const a = addresses[idx];
    const name = prompt("Enter name:", a.name);
    const label = prompt("Enter label (HOME/OFFICE):", a.label);
    const address = prompt("Enter address:", a.address);
    const contact = prompt("Enter contact:", a.contact);
    if (name && label && address && contact) {
      setAddresses((prev) => {
        const copy = [...prev];
        copy[idx] = { name, label, address, contact };
        return copy;
      });
    }
  }

  function addAddress() {
    const name = prompt("Enter name:");
    if (!name) return;
    const label = prompt("Enter label (HOME/OFFICE):") || "HOME";
    const address = prompt("Enter address:");
    const contact = prompt("Enter contact number:");
    if (name && address && contact) {
      setAddresses((prev) => [...prev, { name, label, address, contact }]);
      setSelectedIdx(addresses.length);
    }
  }

  return (
    <div className="checkout-page">

      <div className="container">
        <div className="address-section" id="addressList">
          <div className="steps">
            <span>Address</span> <span>Shipping</span> <span>Payment</span>
          </div>

          {addresses.map((addr, idx) => (
            <div className="address-box" key={idx}>
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  name="address"
                  checked={selectedIdx === idx}
                  onChange={() => setSelectedIdx(idx)}
                />
                <div className="address-details">
                  <h4>
                    {addr.name} <span className="tag">{addr.label}</span>
                  </h4>
                  <p>{addr.address}</p>
                  <p className="contact">Contact: {addr.contact}</p>
                </div>
              </div>
              <div className="edit-remove">
                <span className="edit-btn" onClick={() => editAddress(idx)}>Edit</span> |{" "}
                <span className="remove-btn" onClick={() => removeAddress(idx)}>Remove</span>
              </div>
            </div>
          ))}

          <div className="add-address" role="button" onClick={addAddress}>
            <i className="fa-solid fa-plus"></i> Add New Address
          </div>
        </div>

        <aside className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-item"><span>Price</span><span>{formatCurrency(price)}</span></div>
          <div className="summary-item"><span>Discount</span><span>{formatCurrency(discount)}</span></div>
          <div className="summary-item"><span>Shipping</span><span style={{color:"#06b28e"}}>Free</span></div>
          <div className="summary-item"><span>Coupon Applied</span><span>{formatCurrency(0)}</span></div>
          <div className="summary-item total"><span>TOTAL</span><span>{formatCurrency(total)}</span></div>
          <div className="summary-item"><span>Estimated Delivery by</span><span><b>{estimatedDelivery()}</b></span></div>
          <div className="coupon"><input type="text" placeholder="Coupon Code" /></div>
          <button className="checkout-btn" onClick={() => navigate("/shipping")}>Continue to Shipping</button>
         <button className="back-btn" onClick={() => navigate("/cart")}>Back to Cart</button>
        </aside>
      </div>

      
    </div>
  );
}
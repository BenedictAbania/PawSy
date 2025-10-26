import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";
import productData from "../data/products.json";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Initialize cart with sample items from products.json
    // In a real app, this would come from localStorage or a backend API
    const initialCart = [
      {
        ...productData.find((p) => p.id === 4), // Premium Dog Food
        quantity: 1,
      },
      {
        ...productData.find((p) => p.id === 3), // Dog Bowl
        quantity: 1,
      },
    ].filter((item) => item.id); // Only include items that exist in products.json
    setCartItems(initialCart);
  }, []);

  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
    // In a real app, you would also update localStorage or backend here
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    // In a real app, you would also update localStorage or backend here
  };

  const addToCart = (productId) => {
    const product = productData.find((p) => p.id === productId);
    if (!product) return;

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId);
      if (existingItem) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const calculateTotals = () => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = totalPrice * 0.1; // 10% discount
    const finalTotal = totalPrice - discount;
    return { totalPrice, discount, finalTotal };
  };

  const handleProceed = () => {
    // pass cart items to checkout via router state
    navigate("/checkout", { state: { cartItems } });
  };

  const totals = calculateTotals();

  return (
    <>
      <main className="cart-container">
        <h2 className="cart-title">
          Cart <span className="item-count">{cartItems.length} ITEMS</span>
        </h2>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={process.env.PUBLIC_URL + item.image}
                  alt={item.name}
                />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>
                    Category: <strong>{item.category}</strong> | Brand:{" "}
                    <strong>{item.brand}</strong>
                  </p>
                  <div className="quantity-control">
                    <button
                      className="decrease"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="increase"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="discount-banner">
              <i className="fa-solid fa-percent"></i>
              <p>
                10% Instant Discount with Federal Bank Debit Cards on a min
                spend of $150.
              </p>
            </div>
          </div>

          <aside className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Price</span>
              <span>${totals.totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Discount</span>
              <span>− ${totals.discount.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span className="free">Free</span>
            </div>
            <div className="summary-line">
              <span>Coupon Applied</span>
              <span>$0.00</span>
            </div>
            <hr />
            <div className="summary-total">
              <span>TOTAL</span>
              <span>${totals.finalTotal.toFixed(2)}</span>
            </div>
            <p className="delivery-date">
              Estimated Delivery by <strong>01 Feb, 2023</strong>
            </p>
            <input
              type="text"
              placeholder="Coupon Code"
              className="coupon-input"
            />
            <button className="checkout-btn" onClick={handleProceed}>
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </main>
    </>
  );
};

export default Cart;

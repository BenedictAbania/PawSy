import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Jinx Dog Food",
      flavor: "Beef, Brown Rice & Sweet Potato",
      price: 149.99,
      quantity: 1,
      image: "https://i.imgur.com/2iG7h8V.png",
    },
    {
      id: 2,
      name: "Jinx Biscuits",
      flavor: "Pork & Liver",
      price: 169.99,
      quantity: 1,
      image: "https://i.imgur.com/dEUM9VJ.png",
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
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
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>
                    Flavor: <strong>{item.flavor}</strong>
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
                  <button className="remove" onClick={() => removeItem(item.id)}>
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
                10% Instant Discount with Federal Bank Debit Cards on a min spend
                of $150.
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
            <input type="text" placeholder="Coupon Code" className="coupon-input" />
            <button className="checkout-btn" onClick={handleProceed}>
              Proceed to Checkout
            </button>
          </aside>
        </div>
      </main>
    </>
  );
};

export default CartPage;
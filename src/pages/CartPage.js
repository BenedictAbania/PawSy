import React, { useState } from 'react';
import { Container, Row, Col, Button, Image, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import '../styles/CartPage.css'; // We will create this file next

const CartPage = () => {
  const navigate = useNavigate();

  // Mock data based on your design
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "JENX ULIT",
      color: "Gunnared biege",
      price: 149.99,
      quantity: 1,
      image: "https://placehold.co/150x150/FFF0E6/333?", // Placeholder image
    },
    {
      id: 2,
      name: "JENX",
      color: "Lysed bright green",
      price: 169.99,
      quantity: 1,
      image: "https://placehold.co/150x150/E6F9E6/333?", // Placeholder image
    },
  ]);

  // --- Cart Logic ---

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) } // Prevents quantity < 1
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const discount = subtotal * 0.1; // 10% discount from design
    const finalTotal = subtotal - discount;
    return { subtotal, discount, finalTotal };
  };

  const totals = calculateTotals();

  const handleProceed = () => {
    // You can pass cart data to the checkout page if needed
    // navigate("/checkout", { state: { cartItems: cartItems, totals: totals } });
    navigate("/checkout"); // Or just navigate
  };

  return (
    <Container className="cart-container my-5">
      <h2 className="cart-title mb-4">
        Cart <span className="item-count">{cartItems.length} ITEMS</span>
      </h2>
      <Row>
        {/* --- Cart Items Column --- */}
        <Col lg={8}>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <Row key={item.id} className="cart-item mb-4 pb-4">
                <Col md={3}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={6} className="item-details">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-color">Color: {item.color}</p>
                  <div className="quantity-control">
                    <Button
                      variant="light"
                      size="sm"
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      −
                    </Button>
                    <span className="quantity-value">{item.quantity}</span>
                    <Button
                      variant="light"
                      size="sm"
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="link"
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </Col>
                <Col md={3} className="item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </Col>
              </Row>
            ))}
          </div>

          {/* --- Discount Banner --- */}
          <div className="discount-banner">
            <FontAwesomeIcon icon={faPercent} className="me-2" />
            10% Instant Discount with Federal Bank Debit Cards on a min spend of $150. TCA
          </div>
        </Col>

        {/* --- Order Summary Column --- */}
        <Col lg={4}>
          <aside className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-line">
              <span>Price</span>
              <span>${totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Discount</span>
              <span>− ${totals.discount.toFixed(2)}</span>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span className="free-shipping">Free</span>
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
              Estimated Delivery by <strong>01 Feb, 2025</strong>
            </p>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Coupon Code" />
            </Form.Group>
            <Button
              variant="warning"
              className="w-100 checkout-btn"
              onClick={handleProceed}
            >
              Proceed to Checkout
            </Button>
          </aside>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
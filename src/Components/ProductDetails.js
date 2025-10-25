import React, { useState } from 'react';
import './ProductDetails.css';

const ProductDetails = ({ onNavigateToWishlist }) => {
  const [quantity, setQuantity] = useState(1);
  const product = {
    id: 1,
    name: "Dog Food",
    price: 149.99,
    rating: "4.6 / 5.0 (556)",
    features: [
      "Free 3-5 day shipping",
      "Tool-free assembly", 
      "30-day trial"
    ],
    colors: ["#F5F5DC", "#90EE90", "#000000", "#FFB6C1"]
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="product-details">
      <div className="product-details-header">
        <button className="back-button" onClick={() => window.history.back()}>
          ←
        </button>
        <div className="breadcrumb">
          <span className="chair-gray">Choir</span> / <span className="chair-black">Meryl Lounge Chair</span>
        </div>
      </div>

      <div className="product-details-container">
        <div className="product-info-section">
          <h1 className="product-title">DOG FOOD BEACH</h1>
          
          <div className="price-rating">
            <h2 className="price-black">${product.price}</h2>
            <div className="rating">
              <span className="stars">★★★★★</span>
              <span className="rating-value">{product.rating}</span>
            </div>
          </div>

          <div className="description">
            Premium quality dog food for your furry friends. Made with natural ingredients and essential nutrients to keep your dog healthy and active.
          </div>

          <div className="color-selection">
            <div className="colors">
              {product.colors.map((color, index) => (
                <div key={index} className="color-option" style={{backgroundColor: color}}></div>
              ))}
            </div>
          </div>

          <div className="quantity-section">
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
              <span className="quantity">{quantity}</span>
              <button className="quantity-btn" onClick={increaseQuantity}>+</button>
            </div>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>

          <div className="features">
            {product.features.map((feature, index) => (
              <span key={index} className="feature-item">
                {feature}{index < product.features.length - 1 ? ' • ' : ''}
              </span>
            ))}
          </div>

          <div className="action-section">
            <button className="add-to-wishlist" onClick={onNavigateToWishlist}>
              <span className="heart-icon">♥</span> Add to Wishlist
            </button>
            <div className="social-icons">
              <span className="social-icon">𝐟</span>
              <span className="social-icon">▶</span>
              <span className="social-icon">𝐭</span>
              <span className="social-icon">🅾</span>
            </div>
          </div>
        </div>

        <div className="product-image-section">
          <div className="main-image">
            <img src="/images/dog-food.jpg" alt="Dog Food" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
import React, { useState } from 'react';
import './Wishlist.css';

const Wishlist = ({ onNavigateToProduct }) => {
  const [wishlistItems, setWishlistItems] = useState([
    { 
      id: 1, 
      name: "Product Name", 
      price: 960, 
      originalPrice: 1160,
      discount: "40% off",
      image: "/images/cat-food.jpg" 
    },
    { 
      id: 2, 
      name: "Product Name", 
      price: 1960, 
      image: "/images/dog-food 2.jpg" 
    },
    { 
      id: 3, 
      name: "Product Name", 
      price: 550, 
      image: "/images/dockies.jpg" 
    },
    { 
      id: 4, 
      name: "Product Name", 
      price: 760, 
      image: "/images/cat-food 2.jpg" 
    }
  ]);

  const deleteItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const moveAllToCart = () => {
    alert("All items moved to cart!");
  };

  return (
    <div className="wishlist">
      <div className="wishlist-header">
        <div className="header-left">
          <button onClick={onNavigateToProduct} className="back-button">
            ←
          </button>
          <h1>Wishlist ({wishlistItems.length})</h1>
        </div>
        <button className="move-all-cart" onClick={moveAllToCart}>
          Move All To Cart
        </button>
      </div>

      <div className="wishlist-items">
        {wishlistItems.map(item => (
          <div key={item.id} className="wishlist-item">
            <div className="item-image-section">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
                {item.discount && <span className="discount-badge">{item.discount}</span>}
                <button className="delete-btn" onClick={() => deleteItem(item.id)}>
                  🗑️
                </button>
              </div>
            </div>
            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <div className="price-section">
                {item.originalPrice ? (
                  <>
                    <span className="item-price">${item.price}</span>
                    <span className="original-price">${item.originalPrice}</span>
                  </>
                ) : (
                  <span className="item-price">${item.price}</span>
                )}
              </div>
              <button className="wishlist-add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
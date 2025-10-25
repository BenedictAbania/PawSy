//product list
import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const sampleProducts = [
  {
    id: 1,
    name: "Dog Food",
    category: "Pet Food",
    price: 149.99,
    rating: "4.6 / 5.0 (556)",
    image: "/path/to/dog-food-image.jpg"
  },
  {
    id: 2,
    name: "Cat Food", 
    category: "Pet Food",
    price: 129.99,
    rating: "4.4 / 5.0 (342)",
    image: "/path/to/cat-food-image.jpg"
  }
];

const ProductList = () => {
  return (
    <div className="product-list-container">
      <h2>Our Products</h2>
      <div className="products-grid">
        {sampleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
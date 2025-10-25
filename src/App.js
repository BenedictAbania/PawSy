import React, { useState } from 'react';
import './App.css';
import ProductDetails from './Components/ProductDetails';
import Wishlist from './Components/Wishlist';

function App() {
  const [currentPage, setCurrentPage] = useState('productDetails');

  return (
    <div className="App">
      {currentPage === 'productDetails' ? (
        <ProductDetails onNavigateToWishlist={() => setCurrentPage('wishlist')} />
      ) : (
        <Wishlist onNavigateToProduct={() => setCurrentPage('productDetails')} />
      )}
    </div>
  );
}

export default App;
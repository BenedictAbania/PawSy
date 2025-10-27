
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Alert, Button, Form } from "react-bootstrap"; 
import productsData from "../data/products.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import "../styles/Shop.css";

import ProductCard from "../components/ProductCard"; 


import catImg from "../assets/pets/cat.png";
import dogImg from "../assets/pets/dog.png";
import hamsterImg from "../assets/pets/hamster.png";
import parrotImg from "../assets/pets/parrot.png";
import rabbitImg from "../assets/pets/rabbit.png";
import turtleImg from "../assets/pets/turtle.png";

const petTypes = [
  { name: "Cat", image: catImg },
  { name: "Dog", image: dogImg },
  { name: "Hamster", image: hamsterImg },
  { name: "Parrot", image: parrotImg },
  { name: "Rabbit", image: rabbitImg },
  { name: "Turtle", image: turtleImg },
];

// Receive global state/functions if lifted, otherwise keep local
const Shop = ({ favorites: globalFavorites, onToggleFavorite: globalToggleFavorite }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPet = queryParams.get("petType") || "All";

  // Use local state if global state isn't provided (for flexibility)
  const [localFavorites, setLocalFavorites] = useState([]);
  const favorites = globalFavorites !== undefined ? globalFavorites : localFavorites;
  const setFavorites = globalFavorites !== undefined ? () => {} : setLocalFavorites; // No-op if global

  // Use local toggle if global function isn't provided
  const localToggleFavorite = (product) => { // Updated to accept product object
    const id = product.id;
    setFavorites((prev) =>
      prev.find(item => item.id === id) 
        ? prev.filter((item) => item.id !== id) 
        : [...prev, product] // Store the whole product object
    );
  };
  const onToggleFavorite = globalToggleFavorite || localToggleFavorite;


  const [products, setProducts] = useState(productsData);
  const [filters, setFilters] = useState({
    petType: initialPet,
    category: "All",    
    brand: "All",
    minPrice: 0,
    maxPrice: 100, // Assuming max price is 100 based on range max
  });


  const [showCartAlert, setShowCartAlert] = useState(false);
  const [alertProduct, setAlertProduct] = useState("");

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product.name);
    setAlertProduct(product.name);
    setShowCartAlert(true);
    setTimeout(() => {
      setShowCartAlert(false);
    }, 3000);
    // In a real app, you'd update global cart state here
  };

  
  const handleFilterChange = (field, value) => {
    if (field === "petType") {
      setFilters({
        ...filters,
        petType: filters.petType === value ? "All" : value,
      });
    } else {
      setFilters({ ...filters, [field]: value });
    }
  };

  // --- Filter Logic (useEffect) ---
  useEffect(() => {
    let filtered = productsData;

    if (filters.petType !== "All") {
      filtered = filtered.filter((p) => p.petType === filters.petType);
    }
    if (filters.category !== "All") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.brand !== "All") {
      filtered = filtered.filter((p) => p.brand === filters.brand);
    }

    filtered = filtered.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    setProducts(filtered);
  }, [filters]);

  // --- Update filter from URL Query Params ---
  useEffect(() => {
    const petFromQuery = queryParams.get("petType");
    if (petFromQuery && petFromQuery !== filters.petType) {
      setFilters((prev) => ({ ...prev, petType: petFromQuery }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]); // Depend only on location.search

  return (
    <Container className="my-5">
      {/* --- Floating Cart Alert --- */}
      <Alert 
        variant="success"
        show={showCartAlert}
        onClose={() => setShowCartAlert(false)}
        dismissible
        className="cart-alert" // Ensure this class is styled (e.g., in App.css or Shop.css)
      >
        Added <strong>{alertProduct}</strong> to your cart!
      </Alert>

      {/* SHOP BY PET SECTION */}
      <section className="shop-by-pet-section text-center mb-5">
        <h3 className="section-title">Shop by Pet</h3>
        <div className="pet-icons d-flex justify-content-center gap-4 mt-4 flex-wrap">
          {petTypes.map((pet) => (
            <div
              key={pet.name}
              className={`pet-icon-container ${
                filters.petType === pet.name ? "active" : ""
              }`}
              onClick={() => handleFilterChange("petType", pet.name)}
              role="button" // Add role for accessibility
              tabIndex={0}  // Add tabIndex for accessibility
              onKeyPress={(e) => e.key === 'Enter' && handleFilterChange("petType", pet.name)} // Keyboard accessibility
            >
              <img src={pet.image} alt={pet.name} className="pet-icon-image" />
              <p>{pet.name}</p>
            </div>
          ))}
        </div>
      </section>

      <Row>
        {/* SIDEBAR FILTERS */}
        <Col md={3}>
          {/* Category Filter */}
          <div className="mb-4 filter-section">
            <h5>Filter by Category</h5>
            {["All", "Accessories", "Food", "Furniture", "Bags", "Toys", "Treats"].map((cat) => ( // Added more categories
              <Form.Check
                key={cat}
                label={cat}
                name="category"
                type="radio"
                id={`cat-${cat}`} // Use more specific ID
                value={cat} // Add value attribute
                checked={filters.category === cat}
                onChange={() => handleFilterChange("category", cat)}
              />
            ))}
          </div>

          {/* Brand Filter */}
          <div className="mb-4 filter-section">
            <h5>Filter by Brand</h5>
            {["All", "PawBrand", "Royal Canin", "WhiskerCo", "Jinx"].map((brand) => ( // Added Jinx
              <Form.Check
                key={brand}
                label={brand}
                name="brand"
                type="radio"
                id={`brand-${brand}`} // Use more specific ID
                value={brand} // Add value attribute
                checked={filters.brand === brand}
                onChange={() => handleFilterChange("brand", brand)}
              />
            ))}
          </div>

          {/* Price Filter */}
          <div className="mb-4 filter-section">
            <h5>Filter by Price</h5>
            <Form.Label>Min: ${filters.minPrice}</Form.Label>
            <Form.Range
              min={0}
              max={200} // Increased max price based on sample data
              step={5} // Add step for better control
              value={filters.minPrice}
              onChange={(e) =>
                handleFilterChange("minPrice", parseInt(e.target.value))
              }
            />
            <Form.Label>Max: ${filters.maxPrice}</Form.Label>
            <Form.Range
              min={0}
              max={200} // Increased max price
              step={5}
              value={filters.maxPrice}
              onChange={(e) =>
                handleFilterChange("maxPrice", parseInt(e.target.value))
              }
            />
          </div>
        </Col>

        {/* PRODUCT GRID */}
        <Col md={9}>
          <h2 className="mb-4">Products</h2> {/* More generic title */}
          <Row>
            {products.length > 0 ? (
              products.map((product) => (
                // --- INTEGRATION: Replace old card with ProductCard component ---
                <Col lg={4} md={6} xs={12} className="mb-4" key={product.id}>
                  <ProductCard 
                    product={product}
                    onAddToCart={handleAddToCart}
                    // Check if the product ID exists in the favorites array
                    isFavorite={favorites.some(fav => fav.id === product.id)} 
                    // Pass the toggle function down
                    onToggleFavorite={onToggleFavorite} 
                  />
                </Col>
                // --- END INTEGRATION ---
              ))
            ) : (
              <Col> {/* Wrap message in Col for proper layout */}
                <p>No products match the current filters.</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;

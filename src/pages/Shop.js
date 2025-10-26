// src/pages/Shop.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Alert, Card, Button, Form } from "react-bootstrap";
import productsData from "../data/products.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import "../styles/Shop.css";

// --- 2. IMPORT YOUR NEW CARD ---
import ProductCard from "../components/ProductCard";

// Import pet silhouettes
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

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPet = queryParams.get("petType") || "All";

  const [favorites, setFavorites] = useState([]);

    // Toggle favorites
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const [products, setProducts] = useState(productsData);
  const [filters, setFilters] = useState({
    petType: initialPet,
    category: "All",    
    brand: "All",
    minPrice: 0,
    maxPrice: 100,
  });

    // --- 3. ADD ALERT STATE & HANDLER (Must be *inside* the Shop function) ---
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
  // --- END NEW STATE & HANDLER ---

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

  useEffect(() => {
    const petFromQuery = queryParams.get("petType");
    if (petFromQuery && petFromQuery !== filters.petType) {
      setFilters((prev) => ({ ...prev, petType: petFromQuery }));
    }
  }, [location.search]);

  return (
    <Container className="my-5">
      {/* --- 4. ADD THE FLOATING ALERT (Must be *inside* the return) --- */}
      <Alert 
        variant="success"
        show={showCartAlert}
        onClose={() => setShowCartAlert(false)}
        dismissible
        className="cart-alert"
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
            >
              <img src={pet.image} alt={pet.name} className="pet-icon-image" />
              <p>{pet.name}</p>
            </div>
          ))}
        </div>
      </section>

      <Row>
        {/* SIDEBAR FILTERS (no pet filter here) */}
        <Col md={3}>
          <div className="mb-4">
            <h5>Filter by Category</h5>
            {["All", "Accessories", "Food", "Furniture", "Bags"].map((cat) => (
              <Form.Check
                key={cat}
                label={cat}
                name="category"
                type="radio"
                id={cat}
                checked={filters.category === cat}
                onChange={() => handleFilterChange("category", cat)}
              />
            ))}
          </div>

          <div className="mb-4">
            <h5>Filter by Brand</h5>
            {["All", "PawBrand", "Royal Canin", "WhiskerCo"].map((brand) => (
              <Form.Check
                key={brand}
                label={brand}
                name="brand"
                type="radio"
                id={brand}
                checked={filters.brand === brand}
                onChange={() => handleFilterChange("brand", brand)}
              />
            ))}
          </div>

          <div className="mb-4">
            <h5>Filter by Price</h5>
            <Form.Label>Min: ${filters.minPrice}</Form.Label>
            <Form.Range
              min={0}
              max={100}
              value={filters.minPrice}
              onChange={(e) =>
                handleFilterChange("minPrice", parseInt(e.target.value))
              }
            />
            <Form.Label>Max: ${filters.maxPrice}</Form.Label>
            <Form.Range
              min={0}
              max={100}
              value={filters.maxPrice}
              onChange={(e) =>
                handleFilterChange("maxPrice", parseInt(e.target.value))
              }
            />
          </div>
        </Col>

        {/* PRODUCT GRID */}
        <Col md={9}>
          <Row>
            {products.length > 0 ? (
              products.map((product) => (
                <Col md={4} className="mb-4" key={product.id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <Card.Title>{product.name}</Card.Title>
                          <Card.Text>${product.price.toFixed(2)}</Card.Text>
                        </div>
                        <Button
                          variant="link"
                          className="heart-btn p-0"
                          onClick={() => toggleFavorite(product.id)}
                        >
                          <FontAwesomeIcon
                            icon={
                              favorites.includes(product.id)
                                ? faHeartSolid
                                : faHeartRegular
                            }
                          />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;

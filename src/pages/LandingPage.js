// src/pages/LandingPage.js
import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import heroImage from "../assets/hero-image.png";
import qualityImage from "../assets/dogNcat.png";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-section">
              <h5 className="brand-name">PawSy</h5>
              <h1>
                Everything Your Pet <br />
                Needs, All in One Place.
              </h1>
              <p>
                Discover top pet products, carefully selected by pet lovers to
                ensure premium quality, comfort, and value for your beloved
                companions.
              </p>
              <Button className="shop-btn" onClick={() => navigate("/shop")}>
                Shop Now
              </Button>
            </Col>
            <Col md={6} className="image-section">
              <div className="hero-image-container">
                <img src={heroImage} alt="Happy pets" className="hero-image" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CATEGORY SECTION */}
      <section className="category-section">
        <Container>
          <h3 className="section-title">Browse by category</h3>
          <Row className="justify-content-center mt-4">
            {["Accessories", "Food", "Furniture", "Bags"].map((cat, index) => (
              <Col key={index} xs={6} md={3} className="text-center">
                <div className="category-item">
                  <div className="icon-placeholder"></div>
                  <p>{cat}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured-products">
        <Container>
          <h3 className="section-title">Featured products</h3>
          <Row className="justify-content-center mt-4">
            {[1, 2, 3].map((i) => (
              <Col key={i} md={4} className="mb-4">
                <Card className="product-card">
                  <div className="product-image"></div>
                  <Card.Body>
                    <Card.Title>Product Name</Card.Title>
                    <Card.Text>$19.99</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* QUALITY SECTION */}
      <section className="quality-section">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="quality-image">
                <img
                  src={qualityImage}
                  alt="dog and cat"
                  className="quality-img"
                />
              </div>
            </Col>
            <Col md={6}>
              <h3>Quality you can trust, Comfort they can feel</h3>
              <p>
                Our mission is simple. We provide trusted, affordable, and
                high-quality supplies to help every pet live a happy and healthy
                life.
              </p>
              <Button
                className="learn-more-btn"
                onClick={() => navigate("/aboutUs")}
              >
                Learn More
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* BEST SELLING */}
      <section className="best-selling">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="section-title">Best selling products</h3>
            <Button className="shop-all-btn" onClick={() => navigate("/shop")}>
              Shop All
            </Button>
          </div>
          <Row className="mt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Col key={i} xs={6} md={3} className="mb-4">
                <Card className="product-card">
                  <div className="product-image"></div>
                  <Card.Body>
                    <Card.Title>Product Name</Card.Title>
                    <Card.Text>$19.99</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* SHOP BY PET (Functional) */}
      <section className="shop-by-pet-section text-center mb-5">
        <Container>
          <h3 className="section-title">Shop by Pet</h3>
          <Row className="justify-content-center mt-4">
            {[
              { name: "Cat", image: require("../assets/pets/cat.png") },
              { name: "Dog", image: require("../assets/pets/dog.png") },
              { name: "Hamster", image: require("../assets/pets/hamster.png") },
              { name: "Parrot", image: require("../assets/pets/parrot.png") },
              { name: "Rabbit", image: require("../assets/pets/rabbit.png") },
              { name: "Turtle", image: require("../assets/pets/turtle.png") },
            ].map((pet, index) => (
              <Col key={index} xs={4} md={2} className="text-center">
                <div
                  className="pet-icon-container"
                  onClick={() =>
                    (window.location.href = `/shop?petType=${pet.name}`)
                  }
                >
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="pet-icon-image"
                  />
                  <p>{pet.name}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;

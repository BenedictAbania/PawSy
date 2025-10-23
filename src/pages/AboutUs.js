// src/pages/AboutUs.js
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import heroPets from "../assets/about-pets.png"; // ✅ ensure this image exists
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <>
      {/* About Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">About our store</h2>
          <Row className="align-items-center">
            <Col md={6}>
              <p>
                At <strong>PawCentral</strong>, we believe every pet deserves the best care.
                Our mission is to make pet parenting easier and happier by
                providing top-quality products, expert guidance, and a welcoming
                shopping experience. Our team is driven by love for animals and
                a passion for creating long-lasting relationships with our
                customers.
              </p>
              <Row className="text-center mt-4">
                <Col>
                  <h3 className="text-warning fw-bold">2k+</h3>
                  <p>Happy Clients</p>
                </Col>
                <Col>
                  <h3 className="text-warning fw-bold">72</h3>
                  <p>Brands</p>
                </Col>
                <Col>
                  <h3 className="text-warning fw-bold">1.8k+</h3>
                  <p>Products</p>
                </Col>
                <Col>
                  <h3 className="text-warning fw-bold">28</h3>
                  <p>Years in Business</p>
                </Col>
              </Row>
            </Col>
            <Col md={6} className="text-center">
              <img
                src={heroPets}
                alt="Happy pets"
                className="img-fluid rounded about-hero-img"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-5">
        <Container>
          <h3 className="text-center mb-5 fw-bold">Why Choose PawCentral?</h3>
          <Row>
            <Col md={4} className="mb-4">
              <h5 className="text-warning">(ICON) Handpicked Quality Products</h5>
              <p>
                Every item in our store is carefully selected for safety,
                comfort, and durability. We ensure the best quality standards so
                your pet gets only the finest.
              </p>
            </Col>
            <Col md={4} className="mb-4">
              <h5 className="text-warning">(ICON) Everything in One Place</h5>
              <p>
                From grooming tools to nutritious food, toys, and accessories —
                we’ve got everything your pet could ever need.
              </p>
            </Col>
            <Col md={4} className="mb-4">
              <h5 className="text-warning">(ICON) Affordable and Accessible</h5>
              <p>
                We make premium-quality pet care affordable for everyone. Enjoy
                exclusive bundles and seasonal discounts to help you shop smart.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-light">
        <Container>
          <h3 className="text-center mb-5 fw-bold">What people say about us</h3>
          <Row className="align-items-center">
            <Col md={8}>
              <blockquote className="blockquote">
                <p className="fs-5 fst-italic">
                  “I’m really impressed with the quality of the cat food and
                  litter I bought from PawCentral! Everything arrived neatly
                  packed, and the website was so easy to use. Definitely
                  recommending it to all my fellow cat lovers.”
                </p>
                <footer className="blockquote-footer mt-3">
                  Jonas P., <cite title="Source Title">Cat Owner</cite>
                </footer>
              </blockquote>
            </Col>
            <Col md={4} className="text-center position-relative">
              <div className="testimonial-circle">
                {/* Placeholder for testimonial image */}
                <div className="testimonial-placeholder rounded-circle shadow d-inline-block"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Vision and Mission */}
      <section className="py-5">
        <Container>
          <Row>
            <Col md={6} className="mb-4">
              <Card className="h-100 shadow-sm p-4">
                <Card.Title className="Our-Vision">Our Vision</Card.Title>
                <Card.Text>
                  Our vision is to build a community where every pet is loved,
                  cared for, and given the best quality of life possible. We
                  aspire to be the trusted hub for pet care essentials,
                  recognized for our commitment to integrity, compassion, and
                  sustainability.
                </Card.Text>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100 shadow-sm p-4">
                <Card.Title className="Our-Mission">Our Mission</Card.Title>
                <Card.Text>
                  Our mission is to make pet care simple, joyful, and accessible
                  to everyone. We aim to provide high-quality, safe, and
                  affordable products that enrich the lives of pets and their
                  owners. Through trust and care, we strive to serve pet lovers
                  while nurturing healthy and happy companions.
                </Card.Text>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AboutUs;

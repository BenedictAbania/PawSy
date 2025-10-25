import React from "react";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw,faMagnifyingGlass,faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { faHeart,faUser} from '@fortawesome/free-regular-svg-icons'
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import Logo from "../assets/icon-logo.png";

const NavBar = () => {
  return (
    <Navbar expand="lg" className="main-navbar">
      <Container>
        <Navbar.Brand href="/home" className="brand-logo">
          <img src={Logo} alt="PawSy" className="icon-logo" />
          PawSy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="/home" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link href="/shop" className="nav-link-custom">Shop</Nav.Link>
            <Nav.Link href="/aboutUs" className="nav-link-custom">About Us</Nav.Link>
            <Nav.Link href="/contact" className="nav-link-custom">Contact Us</Nav.Link>
          </Nav>
          <Form className="d-flex align-items-center search-form">
            <FormControl type="search" placeholder="Search products..." className="search-input"/>
            <Button variant="dark" className="search-btn"><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
          </Form>
          <div className="nav-icons">
            <span className="nav-icon"><FontAwesomeIcon icon={faCartShopping} /></span>
            <span className="nav-icon"><FontAwesomeIcon icon={faHeart} /></span>
            <span className="nav-icon"><Link to="/account"><FontAwesomeIcon icon={faUser} /></Link></span>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

import React from "react";
import "./Header.css";
import myBrandIcon from "../../asset/spy_2062774.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
const HeaderSub = () => {
  return (
    <div className="header-container">
      <Navbar
        fixed="top"
        style={{ padding: "0.8rem", background: "white" }}
        collapseOnSelect
        expand="lg"
        // className="bg-body-tertiary"
      >
        <Container>
          <div className="header-brand">
            <Navbar.Brand href="#home">
              <img
                src={myBrandIcon}
                style={{ width: "3rem" }}
                alt="Icon Visualization"
              />
            </Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none" }}>
              {" "}
              <h1>NutrinSight</h1>
            </Link>
          </div>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/about-us-more">About Us</Nav.Link>

              <Nav.Link href="/product-list">Product</Nav.Link>
            </Nav>

            <Nav className="right-navbar">
              <Nav.Link href="/login">Log In</Nav.Link>
              <Nav.Link eventKey={2} href="/signup">
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderSub;

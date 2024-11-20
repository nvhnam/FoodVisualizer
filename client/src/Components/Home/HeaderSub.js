import React, { useEffect, useState } from "react";
import "./Header.css";
import myBrandIcon from "../../asset/spy_2062774.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const HeaderSub = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setLoggedIn(true);
      setUsername(JSON.parse(storedUser).username);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("chatMessages");
    localStorage.removeItem("StatusBar");
    localStorage.removeItem("DataNutrient");
    localStorage.removeItem("sortedProductsSuggestion");
    setLoggedIn(false);
    setUsername(null);
    navigate("/");
  };

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
                style={{ width: "2rem" }}
                alt="Icon Visualization"
              />
            </Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none" }}>
              {" "}
              <h1 className="fs-3">NutriGuide </h1>
            </Link>
          </div>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            style={{ marginLeft: "2rem" }}
            id="responsive-navbar-nav"
          >
            <Nav className="me-auto">
              <Nav.Link href="/about-us-more">About Us</Nav.Link>

              <Nav.Link href="/product-list">Product</Nav.Link>
            </Nav>

            <Nav className={`right-navbar ${loggedIn && "w-25"}`}>
              {loggedIn ? (
                <div className="d-flex h-100 w-100 justify-content-between align-items-center gap-1">
                  <Nav.Link className="d-flex gap-1" href="/cart">
                    <span>
                      <i className="fa-solid fa-cart-shopping"></i>
                    </span>
                    Cart
                  </Nav.Link>
                  <Nav.Link
                    style={{ pointerEvents: "none" }}
                    className="gap-1 d-flex disable"
                  >
                    <span className="">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    {username}
                  </Nav.Link>

                  <Button
                    onClick={handleLogout}
                    className="px-4 py-n2 "
                    size="small"
                    variant="contained"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Nav.Link href="/login">Log In</Nav.Link>
                  <Nav.Link href="/signup" eventKey={2}>
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderSub;

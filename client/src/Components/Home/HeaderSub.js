import React, { useEffect, useState } from "react";
import "./Header.css";
import myBrandIcon from "../../asset/spy_2062774.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const PORT = process.env.REACT_APP_PORT;
const URL = process.env.REACT_APP_URL || `http://localhost:${PORT}`;

const HeaderSub = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (username === null) {
      fetch(`${URL || `http://localhost:${PORT}`}/profile`, {
        method: "GET",
        credentials: "include",
        mode: "cors",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log("profile data: ", data);
            localStorage.setItem("user", JSON.stringify(data));
          }
        });

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        if (JSON.parse(storedUser)) {
          setLoggedIn(true);
          setUsername(JSON.parse(storedUser).username);
        }
      } else {
        setLoggedIn(false);
      }
    }
  }, [username]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      await fetch(`${URL || `http://localhost:${PORT}`}/logout`, {
        method: "POST",
        credentials: "include",
      });
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("chatMessages");
    localStorage.removeItem("StatusBar");
    localStorage.removeItem("DataNutrient");
    localStorage.removeItem("sortedProductsSuggestion");
    setLoggedIn(false);
    setUsername(null);
    navigate("/product-list");
  };

  return (
    <div className="header-container">
      <Navbar
        fixed="top"
        expand="md"
        className="header-navbar"
        collapseOnSelect
      >
        <Container fluid="md">
          <div className="header-brand">
            <Navbar.Brand as={Link} to="/">
              <img
                src={myBrandIcon}
                className="brand-icon"
                alt="Icon Visualization"
              />
              <h1 className="brand-title">
                <span className="nutri">Traffic</span>
                <span className="guide">Shop</span>
              </h1>
            </Navbar.Brand>
          </div>

          <Navbar.Toggle className="menu-toggle">&#9776;</Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/about-us-more">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/product-list">
                Product
              </Nav.Link>
            </Nav>

            <Nav className={`right-navbar ${loggedIn ? "w-auto mw-75" : ""}`}>
              {loggedIn ? (
                <div className="user-section">
                  <Nav.Link as={Link} to="/cart" className="cart-icon">
                    <i className="fa-solid fa-cart-shopping"></i>
                  </Nav.Link>
                  <Nav.Link
                    className="user-info"
                    style={{ pointerEvents: "none" }}
                  >
                    <i
                      className="fa-solid fa-user"
                      style={{ marginRight: "8px" }}
                    ></i>
                    {username.length >= 10
                      ? username.substr(0, 10) + "..."
                      : username}
                  </Nav.Link>
                  <Button onClick={handleLogout} className="logout-btn">
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    Log In
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup">
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

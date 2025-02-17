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
      const token = localStorage.getItem("token");

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
    await fetch(`${URL || `http://localhost:${PORT}`}/logout`, {
      method: "POST",
      credentials: "include",
    });

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
        style={{ padding: "0.8rem", background: "#FBF4EA" }}
        collapseOnSelect
        expand="md"
      >
        <Container fluid>
          <div className="header-brand" style={{ marginRight: "8rem" }}>
            <Navbar.Brand href="#home">
              <img
                src={myBrandIcon}
                style={{ width: "2rem" }}
                alt="Icon Visualization"
              />
              {/* <Link to="/" style={{ textDecoration: "none" }}> */}{" "}
              <h1 className="fs-3">
                <span style={{ color: "#D89834" }}>Nutri</span>
                <span style={{ color: "black" }}>Guide</span>
              </h1>
              {/* </Link> */}
            </Navbar.Brand>
          </div>

          <Navbar.Toggle
            className="bg-warning px-3 py-2"
            aria-controls="responsive-navbar-nav"
          >
            &#9776;
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/about-us-more">About Us</Nav.Link>

              <Nav.Link href="/product-list">Product</Nav.Link>
            </Nav>

            <Nav className={`right-navbar ${loggedIn && "w-auto mw-75"}`}>
              {loggedIn ? (
                <div className="d-flex h-100 w-100 justify-content-between align-items-center gap-2">
                  <Nav.Link className="d-flex gap-1" href="/cart">
                    <span>
                      <i className="fa-solid fa-cart-shopping"></i>
                    </span>
                    {/* Cart */}
                  </Nav.Link>
                  <Nav.Link
                    style={{ pointerEvents: "none" }}
                    className="gap-1 d-flex disable"
                  >
                    <span className="">
                      <i className="fa-solid fa-user"></i>
                    </span>
                    {username.length >= 10
                      ? username.substr(0, 10) + "..."
                      : username}
                  </Nav.Link>

                  <Button
                    onClick={handleLogout}
                    className="px-5 py-n1 "
                    size="small"
                    style={{ backgroundColor: "#D89834", color: "black" }}
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

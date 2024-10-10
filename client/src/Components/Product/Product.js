import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import { Button } from "@mui/material";
import Pagination from "react-bootstrap/Pagination";
import "./Product.css";
import { MDBInput } from "mdb-react-ui-kit";
import HeaderSub from "../Home/HeaderSub";
import "rsuite/dist/rsuite.min.css";
import Category from "./Category";
import TrafficLight from "../Visualization/Traffic Light System/TrafficLight.js";

const Product = ({ isChecked, isToggle }) => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [foodPerPage] = useState(18);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:8008/product");
        const productData = response.data.map((item) => ({
          ...item,
          img: item.img || null,
        }));
        setProduct(productData);
        setSearchTerm("");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (selectedCategory) {
        try {
          let api = "http://localhost:8008/filter";

          const response = await axios.get(api, {
            params: {
              level0: selectedCategory || null,
            },
          });

          // console.log("Filtered Response:", response.data);

          const filteredProducts = response.data.map((filteredItem) => {
            const productImage = product.find(
              (item) => item.product_id === filteredItem.product_id
            );
            return {
              ...filteredItem,
              product_name: productImage ? productImage.product_name : null,
              img: productImage ? productImage.img : null,
            };
          });
          setSearchResults(filteredProducts);
        } catch (error) {
          console.error("Error fetching filtered products:", error);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchFilteredProducts();
  }, [selectedCategory, product]);

  useEffect(() => {
    const results = searchTerm
      ? product.filter((productItem) =>
          productItem.product_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      : product;

    setSearchResults(results);
  }, [searchTerm, product, currentPage, foodPerPage]);

  // const handleToggle = () => {
  //   setIsChecked(!isChecked);
  // };

  const last = currentPage * foodPerPage;
  const first = last - foodPerPage;
  const currentFood = searchResults.slice(first, last);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const results = product.filter((productItem) =>
        productItem.product_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category);
  };

  const truncate = (nameOfFood, maxLength) => {
    if (!nameOfFood) {
      return "";
    }
    if (nameOfFood.length <= maxLength) {
      return nameOfFood;
    }
    return nameOfFood.substr(0, maxLength) + "...";
  };

  const totalPages = Math.ceil(searchResults.length / foodPerPage);

  const renderPaginationItems = () => {
    const maxPagesToShow = 5;
    const middlePage = Math.ceil(maxPagesToShow / 2);
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= middlePage) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + middlePage >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - middlePage + 1;
      endPage = currentPage + middlePage - 1;
    }

    const items = [];
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => paginate(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    if (startPage !== 1) {
      items.unshift(<Pagination.Ellipsis key="startEllipsis" />);
    }

    if (endPage !== totalPages) {
      items.push(<Pagination.Ellipsis key="endEllipsis" />);
    }

    return items;
  };

  return (
    <div className="product d-flex flex-column align-items-center w-100 h-100">
      <HeaderSub />

      <div
        className="product-items p-1 mx-auto d-flex "
        style={{ marginTop: "6rem" }}
      >
        <div className="select-items" style={{ marginLeft: "2rem" }}>
          <Category onSelectCategory={handleSelectedCategory} />
        </div>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="nav-search">
              <div className="form-outline" data-mdb-input-init>
                <MDBInput
                  type="text"
                  id="formTextExample1"
                  className="form-control"
                  aria-describedby="textExample1"
                  placeholder="Kind Of Food"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                />
                {searchTerm !== "" && (
                  <div style={{ maxHeight: "160px", overflowY: "auto" }}>
                    {searchResults.map((productItem) => (
                      <div
                        key={productItem.product_id}
                        style={{ marginBottom: "10px" }}
                      >
                        <Card.Body>
                          <Link
                            to={`/product-detail/${productItem.product_id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <p>{truncate(productItem.product_name, 50)}</p>
                          </Link>
                        </Card.Body>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div id="textExample1" className="form-text">
                We have a board of food.
              </div>
            </div>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckChecked"
                checked={isChecked}
                onChange={isToggle}
              />
              <label
                className="form-check-label"
                htmlFor="flexSwitchCheckChecked"
              >
                Show Nutrition Labelling
              </label>
            </div>
          </div>

          <Row className="d-flex gap-3 mt-2">
            {currentFood.map((productItem, index) => {
              return (
                <Col
                  style={{ marginTop: "1rem" }}
                  key={productItem.product_id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="w-auto h-auto mx-auto"
                >
                  <Card
                    style={{
                      width: "18rem",
                      maxHeight: "27.5rem",
                      minHeight: "20rem",
                      height: "100%",
                      // overflow: "hidden",
                    }}
                    // className="w-75 h-75"
                  >
                    {productItem.img ? (
                      <Card.Img
                        variant="top"
                        src={productItem.img}
                        style={{ minHeight: "12rem" }}
                        className="w-100 h-100 overflow-hidden rounded-top"
                      />
                    ) : (
                      <div
                        style={{
                          width: "17rem",
                          height: "12rem",
                          backgroundColor: "#e0e0e0",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span>No Image Available</span>
                      </div>
                    )}
                    <Card.Body
                      className="w-100 h-auto d-flex justify-content-center align-items-center"
                      style={{ padding: "1rem" }}
                    >
                      <div className="w-100 h-100 d-flex flex-column  align-items-center gap-2">
                        <Card.Title title={productItem.product_name}>
                          {truncate(productItem.product_name, 21)}
                        </Card.Title>
                        {isChecked && (
                          <TrafficLight
                            productId={productItem.product_id}
                            showText={false}
                            mainPage={true}
                            showPerContainer={true}
                            theWidth=""
                          />
                        )}
                        <Link to={`/product-detail/${productItem.product_id}`}>
                          <Button
                            variant="outlined"
                            size="small"
                            color="warning"
                          >
                            View Detail
                          </Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
      <div style={{ marginTop: "6rem" }}>
        <Pagination style={{ display: "flex", justifyContent: "flex-end" }}>
          <Pagination.First onClick={() => paginate(1)} />
          <Pagination.Prev
            onClick={() => paginate(Math.max(1, currentPage - 1))}
          />
          {renderPaginationItems()}
          <Pagination.Next
            onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
          />
          <Pagination.Last onClick={() => paginate(totalPages)} />
        </Pagination>
      </div>
    </div>
  );
};

export default Product;

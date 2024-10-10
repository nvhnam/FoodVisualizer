import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { Card } from "react-bootstrap";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import ChartButton from "./ChartButton.js";
import "./ProductDetail.css";
import HeaderSub from "../Home/HeaderSub.js";
import { Button } from "@mui/material";
const ProductDetail = ({ isChecked }) => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8008/product-detail/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (productId) {
      fetchFood();
    }
  }, [productId]);
  if (product === null) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <HeaderSub />
      <div className="pd w-100 mt-4" key={product.product_id}>
        {isChecked ? (
          <>
            <h3>How much nutrition is in this food?</h3>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ChartButton productId={product.product_id} />
            </div>
          </>
        ) : (
          <h3>Our Digital Services</h3>
        )}

        <div
          className="pd_content d-md-flex d-sm-block align-items-start flex-row"
          style={{ height: "450px" }}
        >
          <div className="pd_item w-25 p-0 rounded">
            <img
              src={product.img}
              className="rounded w-100 h-100px mb-3"
              style={{ objectfit: "contain", height: "300px" }}
              alt={product.name}
            />
            <h3 className="text-center"> {product.product_name}</h3>

            <p className="mt-3" style={{ textAlign: "left" }}>
              <span>Brand:</span> {product.brand}{" "}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <p className="my-n2" style={{ textAlign: "left" }}>
                <span>Origin:</span> {product.origin}{" "}
              </p>
              <div>
                <Button
                  variant="contained"
                  color="success"
                  size="large"
                  className="px-5 py-2"
                >
                  Buy
                </Button>
              </div>
            </div>
          </div>

          <div className="pd_item">
            <h3 className="text-center">Ingredients:</h3>
            <div className="w-100 h-75 d-flex flex-column justify-content-between">
              <p>{product.ingredients}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { Card } from "react-bootstrap";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import ChartButton from "./ChartButton.js";
import "./ProductDetail.css";

const ProductDetail = () => {
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
    <div className="pd" key={product.product_id}>
      <h3>How much nutrition is in this food?</h3>
      {/* <h1>Our Digital Services</h1> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ChartButton productId={product.product_id} />
      </div>

      <div className="pd_content">
        <div className="pd_item">
          <img
            src={product.img}
            style={{ width: "16rem" }}
            alt={product.name}
          />
          <h3> {product.product_name}</h3>

          <p style={{ textAlign: "left" }}>
            <span>Origin:</span> {product.brand}{" "}
          </p>
        </div>
        <div className="pd_item">
          <h3>Directions </h3>
          <ul>
            {product.description &&
              product.description.split(". ").map((desc, index) => (
                <li key={index} className="">
                  {desc.trim()}
                </li>
              ))}
          </ul>{" "}
          <h3>Storage</h3>
          <ul>
            {product.storage &&
              product.storage.split(". ").map((sto, index) => (
                <li key={index} className="">
                  {sto.trim()}
                </li>
              ))}
          </ul>{" "}
        </div>
        <div className="pd_item">
          <h3>Ingredients:</h3>
          <p>{product.ingredients}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChartButton from "./ChartButton.js";
import "./ProductDetail.css";
import HeaderSub from "../Home/HeaderSub.js";
import { Button } from "@mui/material";
import Footer from "../Home/Footer.js";

const PORT = process.env.REACT_APP_PORT;
const ProductDetail = ({ isChecked }) => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    userId: "",
    productId: "",
  });

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(
          `http://localhost:${PORT}/product-detail/${productId}`
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

  const handleAddToCart = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      const userId = JSON.parse(storedUser).user_id;
      // console.log("UserID: ", userId);
      // console.log("ProductID: ", productId);
      if (!token) {
        setErrorMessage("Please log in to add products to your cart.");
        return;
      }

      const response = await axios.post(
        `http://localhost:${PORT}/cart/add`,
        {
          userId: userId,
          productId: product.product_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setErrorMessage("");
        alert("Product added to cart successfully!");
      } else {
        setErrorMessage("Please log in to add products to your cart.");
      }
    } catch (error) {
      setErrorMessage("Please log in to add products to your cart.");
    }
  };

  return (
    <>
      <HeaderSub />
      <div
        className="pd w-100 mt-4 d-flex flex-column align-items-center"
        key={product.product_id}
      >
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
          className="pd_content d-md-flex d-sm-block align-items-start flex-row justify-content-center w-100"
          style={{ maxWidth: "1300px", height: "480px" }}
        >
          <div className="pd_item w-25 p-0 rounded">
            <img
              src={product.img}
              className="rounded-top w-100 h-100px mb-3"
              style={{ objectfit: "contain", height: "300px" }}
              alt={product.name}
            />
            <h3 className="text-center"> {product.product_name}</h3>

            <p className="mt-3" style={{ textAlign: "left" }}>
              <span>Brand:</span> {product.brand}{" "}
            </p>
            <div className="d-flex justify-content-between align-items-center w-100 mt-n2">
              <p
                className="my-auto w-50 text-break"
                style={{
                  textAlign: "left",
                  wordBreak: "break-word",
                  height: "1.4rem",
                  overflow: "hidden",
                }}
              >
                <span>Origin:</span> {product.origin}{" "}
              </p>

              <div className="d-flex w-50 pr-2 justify-content-center">
                <Button
                  variant="contained"
                  color="success"
                  size="medium"
                  className="px-5 py-2 mr-3"
                  onClick={handleAddToCart}
                >
                  Buy
                </Button>
              </div>
            </div>
            {errorMessage && (
              <p className="text-center fs-6 mt-1" style={{ color: "red" }}>
                {errorMessage}
              </p>
            )}
          </div>

          <div className="pd_item">
            <h3 className="text-center">Ingredients:</h3>
            <div className="w-100 h-75 d-flex flex-column justify-content-between">
              <p>{product.ingredients}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;

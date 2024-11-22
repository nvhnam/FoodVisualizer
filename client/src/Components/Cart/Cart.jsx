import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../Home/Footer";
import HeaderSub from "../Home/HeaderSub";
import TrafficLight from "../Visualization/Traffic Light System/TrafficLight";

const PORT = process.env.REACT_APP_PORT;
const URL = process.env.REACT_APP_URL || `http://localhost:${PORT}`;

const Cart = ({ isChecked }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalNutrition, setTotalNutrition] = useState({});

  useEffect(() => {
    const fetchCartAndNutrition = async () => {
      const storedUser = localStorage.getItem("user");
      const userId = JSON.parse(storedUser).user_id;

      //   axios
      //     .get(`${URL || `http://localhost:${PORT}`}/cart/${userId}`)
      //     .then(async (res) => {
      //       const fetchedCartItems = res.data.cartItem || [];
      //       setCartItems(fetchedCartItems);
      //       return axios.get(
      //         `${URL || `http://localhost:${PORT}`}/nutrients/${userId}`
      //       );
      //     })
      //     .then((res) => {
      //       const total = res.data.totalNutrition;
      //       setTotalNutrition(total);
      //       // console.log("total: ", total);
      //     })
      //     .catch((err) => {
      //       console.error(err);
      //     });
      // };

      const response = await axios.get(
        `${URL || `http://localhost:${PORT}`}/cart-with-nutrients/${userId}`
      );
      const { cartItem, totalNutrition } = response.data;
      console.log(cartItem);
      setCartItems(cartItem);
      setTotalNutrition(totalNutrition);
    };
    fetchCartAndNutrition();
  }, []);

  // console.log("Cart: ", cartItems);

  // console.log("Total: ", totalNutrition);

  const handleRemove = (productId, productCalories, quantity) => {
    const storedUser = localStorage.getItem("user");
    const userId = JSON.parse(storedUser).user_id;

    // Fetch current calories from localStorage
    const statusBar = JSON.parse(localStorage.getItem("StatusBar"));
    const currentCalories = statusBar?.caloriesCurrent || 0; // Default to 0 if undefined

    axios
      .delete(
        `${URL || `http://localhost:${PORT}`}/cart/${userId}/${productId}`
      )
      .then((res) => {
        // Update cart items
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.product_id !== productId)
        );
        const productCaloriesTotal = Math.round(productCalories) * quantity;
        const updatedCalories = currentCalories - productCaloriesTotal;
        console.log(
          "current ",
          currentCalories,
          "product calorie",
          Math.round(productCalories)
        );

        // Update the StatusBar in localStorage
        const updatedStatusBar = {
          ...statusBar, // Retain other properties (e.g., caloriesMaxSuggestions)
          caloriesCurrent: updatedCalories,
        };
        localStorage.setItem("StatusBar", JSON.stringify(updatedStatusBar));

        console.log("Updated StatusBar:", updatedStatusBar);

        // Optional: return or log updated calories
        return updatedCalories;
      })
      .catch((err) => {
        console.error("Error removing product: ", err);
      });
  };

  return (
    <>
      <div className="w-100 h-100 d-flex flex-column align-items-center gap-5 mb-3">
        <HeaderSub />
        <div
          className="d-flex flex-column w-100 h-100 p-2 my-5"
          style={{ maxWidth: "1200px", minHeight: "75vh" }}
        >
          <div className=" w-100 mt-5">
            <h1 className="text-center mb-5" style={{ color: "#f55f8d" }}>
              Cart
            </h1>
          </div>

          <div className="d-flex w-100 h-100 flex-column gap-5">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <>
                  <div
                    className="d-flex align-items-center justify-content-center column-gap-4 mb-4 w-100 h-auto"
                    key={item.product_id}
                  >
                    <div
                      className="text-center"
                      style={{
                        width: "10rem",
                        height: "10rem",
                      }}
                    >
                      <img
                        style={{ objectFit: "fill" }}
                        className="w-100 h-100 overflow-hidden rounded"
                        src={item.img}
                        alt={item.product_name}
                      />
                    </div>

                    <div className="w-25 d-flex flex-column justify-content-center align-items-start">
                      <h3 className="text-left fs-4 ">{item.product_name}</h3>
                      <div className="d-flex flex-column justify-content-center h-auto mt-4">
                        <p className="fs-6 my-n2">
                          <span className="fw-bold">Brand: </span>
                          {item.brand}
                        </p>
                        <p className="fs-6 mb-n2">
                          <span className="fw-bold">Origin: </span>
                          {item.origin}
                        </p>
                        <p className="fs-6">Quantity: {item.quantity}</p>
                      </div>
                    </div>

                    <div className="  d-flex justify-content-end w-auto">
                      <Button
                        onClick={() =>
                          handleRemove(
                            item.product_id,
                            item.calories,
                            item.quantity
                          )
                        }
                      >
                        Remove
                      </Button>
                    </div>

                    {isChecked && (
                      <div className="w-auto">
                        <TrafficLight
                          // mainPage={true}
                          showPerContainer={true}
                          productId={item.product_id}
                          showText={false}
                        />
                      </div>
                    )}
                  </div>
                </>
              ))
            ) : (
              <p className="w-100 h-100 mt-5 text-center ">
                Your cart is empty!
              </p>
            )}
            {cartItems.length > 0 && isChecked && (
              <div className="w-100 h-100">
                <h3 className="text-left">Total Nutrition (Per 100gr)</h3>
                <p className="fs-6 mb-n2">
                  <span className="fw-bold">Energy: </span>
                  {totalNutrition.energy} kJ
                </p>
                <p className="fs-6 mb-n2">
                  <span className="fw-bold">Calories: </span>
                  {totalNutrition.calories} kcal
                </p>
                <p className="fs-6 mb-n2">
                  <span className="fw-bold">Fat: </span>
                  {totalNutrition.fat} g
                </p>
                <p className="fs-6 mb-n2">
                  <span className="fw-bold">Saturates: </span>
                  {totalNutrition.saturates} g
                </p>
                <p className="fs-6 mb-n2">
                  <span className="fw-bold">Sugars: </span>
                  {totalNutrition.sugars} g
                </p>
                <p className="fs-6 mb-n2">
                  <span className="fw-bold">Salt: </span>
                  {totalNutrition.salt} g
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;

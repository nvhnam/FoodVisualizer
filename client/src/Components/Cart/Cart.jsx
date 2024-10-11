import React, { useState, useEffect } from "react";
import HeaderSub from "../Home/HeaderSub";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalNutrition, setTotalNutrition] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const userId = JSON.parse(storedUser).user_id;

    axios
      .get(`http://localhost:8008/cart/${userId}`)
      .then(async (res) => {
        const fetchedCartItems = res.data.cartItem || [];
        setCartItems(fetchedCartItems);
        const total = fetchedCartItems.reduce(
          (acc, item) => {
            const quantity = parseFloat(item.quantity) || 0;
            acc.energy += (parseFloat(item.energy) || 0) * quantity;
            acc.calories += (parseFloat(item.calories) || 0) * quantity;
            acc.fat += (parseFloat(item.fat) || 0) * quantity;
            acc.saturates += (parseFloat(item.saturates) || 0) * quantity;
            acc.sugars += (parseFloat(item.sugars) || 0) * quantity;
            acc.salt += (parseFloat(item.salt) || 0) * quantity;
            return acc;
          },
          {
            energy: 0,
            calories: 0,
            fat: 0,
            saturates: 0,
            sugars: 0,
            salt: 0,
          }
        );
        setTotalNutrition(total);

        // let totalNutrients = {
        //   energy: 0,
        //   calories: 0,
        //   fat: 0,
        //   saturates: 0,
        //   sugar: 0,
        //   salt: 0,
        // };

        // for (const item of items) {
        //   try {
        //     const nutrientResponse = await axios.get(
        //       `/product-nutrients/${item.product_id}`
        //     );
        //     const nutrientValues = nutrientResponse.data;
        //     totalNutrients.energy += nutrientValues.energy * item.quantity;
        //     totalNutrients.calories += nutrientValues.calories * item.quantity;
        //     totalNutrients.fat += nutrientValues.fat * item.quantity;
        //     totalNutrients.saturates +=
        //       nutrientValues.saturates * item.quantity;
        //     totalNutrients.sugar += nutrientValues.sugar * item.quantity;
        //     totalNutrients.salt += nutrientValues.salt * item.quantity;
        //   } catch (error) {
        //     console.error(
        //       `Error fetching nutrients for product ${item.product_id}:`,
        //       error
        //     );
        //   }
        // }

        // setTotalNutrition(totalNutrients);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [totalNutrition]);

  // console.log("Cart: ", cartItems);

  console.log(totalNutrition);

  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center gap-5">
      <HeaderSub />
      <div
        className="d-flex flex-column w-100 h-100 p-2 mt-5"
        style={{ maxWidth: "1300px" }}
      >
        <div className=" w-100 mt-5">
          <h1 className="text-center mb-5" style={{ color: "#f55f8d" }}>
            Your Cart
          </h1>
        </div>

        <div className="d-flex w-100 h-100 flex-column gap-5">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <>
                <div
                  className="d-flex align-items-center gap-4 w-100 h-auto"
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

                  <div>
                    <h3 className="text-left fs-4">{item.product_name}</h3>
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
                </div>
              </>
            ))
          ) : (
            <p className="w-100 h-100 mt-5 text-center ">Your cart is empty</p>
          )}
          {cartItems.length > 0 && (
            <div className="w-100 h-100">
              <h3 className="text-left">Total Nutrition</h3>
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
  );
};

export default Cart;

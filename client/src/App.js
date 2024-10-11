import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Product from "./Components/Product/Product";
import About from "./Components/Home/About";
import AboutMore from "./Components/Home/AboutMore";
import DataV from "./Components/Visualization/AllCharts/AllCharts";
// import PolarChart from "./Components/Visualization/Polar/PolarChart";
// import StackedBarChart from "./Components/Visualization/Bar/BarChart";
// import PieChart from "./Components/Visualization/Pie/PieChart";
import ProductDetail from "./Components/Product/ProductDetail";
import Registration from "./Components/Authentication/Registration";
import LogIn from "./Components/Authentication/LogIn";
import Loading from "./Components/Loading/Loading";
import ManagePage from "./Components/Admin/ManagePage";
import Cart from "./Components/Cart/Cart";
import { isVisible } from "@testing-library/user-event/dist/utils";

const LoadingIndicator = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Loading />
  </div>
);
function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(() => {
    const savedState = localStorage.getItem("toggleState");
    return savedState === "true" ? true : false;
  });

  useEffect(() => {
    localStorage.setItem("toggleState", isChecked);
  }, [isChecked]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) {
    return <LoadingIndicator />;
  }

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Routes class>
      <Route path="/" exact element={<Home />} />
      <Route path="/about" exact element={<About />} />
      <Route path="/about-us-more" exact element={<AboutMore />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/login" element={<LogIn />} />
      <Route path="/signup" element={<Registration />} />

      <Route
        path="/product-list"
        element={<Product isChecked={isChecked} isToggle={handleToggle} />}
      />
      <Route
        path="/product-detail/:productId"
        element={<ProductDetail isChecked={isChecked} />}
      />
      <Route path="/dv/:productId" element={<DataV />} />
      {/* <Route path="/dv/:foodId" element={<DataV />} />
      <Route path="/food/food-detail/:foodId" element={<ProductDetail />} />
      <Route path="/food/polar/:foodId" element={<PolarChart />} />
      <Route path="/food/bar/:foodId" element={<StackedBarChart />} />
      <Route path="/food/pie/:foodId" element={<PieChart />} /> */}

      {/* <Route path="/mng" element={<ManageProduct />} /> */}
      <Route path="/mng-page" element={<ManagePage />} />
    </Routes>
  );
}

function AppLoading() {
  return (
    <Router>
      <App />
    </Router>
  );
}
export default AppLoading;

import React from "react";
import "./MainHome.css";
import foodparamid from "../../asset/pyramid.png";
import { Link } from "react-router-dom";

const Carousel = () => {
  return (
    <div className="main-home">
      <div className="left_main-home">
        <h3 className="animate__animated animate__fadeInUp">
          Discover Key Nutrients
        </h3>
        <h1 className="animate__animated animate__fadeInUp animate__delay-1s">
          Empowering Health
        </h1>
        <h1 className="animate__animated animate__fadeInUp animate__delay-1s">
          through
        </h1>
        <h1 className="animate__animated animate__fadeInUp animate__delay-1s">
          Nutrient Awareness
        </h1>
        <div className="desciption_main-home">
          <ul className="animate__animated animate__fadeInUp animate__delay-2s">
            <li>
              <i className="las la-check" />
              Navigate Your Way to Healthier Eating Habits
            </li>
            <li>
              <i className="las la-check" />
              Enhancing Your Food Choices with Our Color-Coded System
            </li>
          </ul>
          <Link to="/product-list">
            <button className="btn-quote animate__animated animate__fadeInUp animate__delay-3s">
              GET STARTED
            </button>
          </Link>
        </div>
      </div>
      <div className="right_main-home">
        <div className="main-home__img animate__animated animate__fadeInUp animate__delay-2s">
          <img src={foodparamid} alt="Food Healthy Paramid" />
        </div>
      </div>
    </div>
  );
};
export default Carousel;

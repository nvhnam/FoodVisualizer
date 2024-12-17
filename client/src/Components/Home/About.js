import React from "react";
import "./About.css";
import myCheck from "../../asset/check-mark.png";
import myAbout from "../../asset/aboutUs.png";
import systemFlow from "../../asset/SystemFlow.jpg";
import { useScroll } from "./ScrollContext";
import { Link } from "react-router-dom";

const About = () => {
  const { aboutRef } = useScroll();

  return (
    <div className="about" ref={aboutRef}>
      <div className="about_content">
        <div
          className="left_about wow animate__ animate__fadeInLeft animated"
          data-wow-duration="2s"
          data-wow-delay="0.2s"
          style={{
            visibility: "visible",
            animationDuration: "2s",
            animationDelay: "0.2s",
            animationName: "fadeInUp",
          }}
        >
          <div className="img-about">
            <img src={systemFlow} alt="imgAbout" />
            <div className="about_overlay"></div>
          </div>
        </div>
        <div
          className="right_about wow animate__ animate__fadeInRight animated"
          data-wow-duration="2s"
          data-wow-delay="0.2s"
          style={{
            visibility: "visible",
            animationDuration: "2s",
            animationDelay: "0.2s",
            animationName: "fadeInRight",
          }}
        >
          <div className="aboutUs">
            <h3 style={{ color: "#D89834" }}>About Us</h3>
            <h1>
              Empowering Your <br />
              Food Choices
            </h1>
          </div>
          <p style={{ lineHeight: "1.8" }}>
            At NutriGuide, we aim to revolutionize the way you understand and
            assess the nutritional value of food products. Based on our
            research, we utilize a color-coded traffic light system (green,
            amber, red) to clearly indicate the healthiness of food items. Our
            platform simplifies nutritional information, helping you make
            informed, healthier decisions about your eating habits. Whether you
            are monitoring your calorie intake or reducing unhealthy nutrients
            like fats, sugar, and salt, NutriGuide is here to guide you every
            step of the way.
          </p>
          <ul style={{ paddingLeft: "1.5rem", lineHeight: "2" }}>
            <li>
              <img
                src={myCheck}
                style={{ width: "1.5rem", marginRight: "0.5rem" }}
                alt="tickAbout"
              />
              Simplified Nutritional Guidance with our Traffic Light System.
            </li>
            <li>
              <img
                src={myCheck}
                style={{ width: "1.5rem", marginRight: "0.5rem" }}
                alt="tickAbout"
              />
              Enhanced Awareness to promote healthier food choices.
            </li>
            <li>
              <img
                src={myCheck}
                style={{ width: "1.5rem", marginRight: "0.5rem" }}
                alt="tickAbout"
              />
              Science-Driven Approach based on reliable research and data.
            </li>
            <li>
              <img
                src={myCheck}
                style={{ width: "1.5rem", marginRight: "0.5rem" }}
                alt="tickAbout"
              />
              Empowering Users to reduce unhealthy fats, sugar, and salt intake.
            </li>
          </ul>
          <Link to="/about-us-more">
            <button
              style={{ backgroundColor: "#D89834" }}
              className="btn-learn-more"
            >
              Read more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

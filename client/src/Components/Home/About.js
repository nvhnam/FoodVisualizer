import React from "react";
import "./About.css";
import myCheck from "../../asset/check-mark.png";
import myAbout from "../../asset/aboutUs.png";
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
          }}>
          <div className="img-about">
            <img src={myAbout} alt="imgAbout" />
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
          }}>
          <div className="aboutUs">
            <h3>About Us</h3>
            <h1>
              Build Your <br />
              Life Better
            </h1>
          </div>
          <p>
            Proin laoreet leo vel enim gravida, at porttitor metus ultricies.
            Cras eu velit enim. Vivamus blandit, dolor ut aliquet rutrum, ex
            elit mattis sapien, non molestie felis neque et nulla. Sed euismod
            turpis id nibh suscipit semper. Pellentesque dapibus risus arcu.
          </p>
          <ul>
            <li>
              <img src={myCheck} style={{ width: "1.5rem" }} alt="tickAbout" />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </li>
            <li>
              <img src={myCheck} style={{ width: "1.5rem" }} alt="tickAbout" />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit{" "}
            </li>
            <li>
              <img src={myCheck} style={{ width: "1.5rem" }} alt="tickAbout" />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit{" "}
            </li>
            <li>
              <img src={myCheck} style={{ width: "1.5rem" }} alt="tickAbout" />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit{" "}
            </li>
          </ul>
          <Link to="/about-us-more">
            <button className="btn-learn-more">find more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

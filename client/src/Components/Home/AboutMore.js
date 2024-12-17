import "./AboutMore.css";
import HeaderSub from "./HeaderSub";

const AboutMore = () => {
  return (
    <div className="about-more">
      <HeaderSub />
      <div className="about-more-content">
        <strong className="animate__animated animate__fadeInDown animate__delay-1s">
          More Details We Send You
        </strong>
        <div
          className="about-more-content"
          style={{ lineHeight: "1.8", textAlign: "justify" }}
        >
          <h2 className="mb-3" style={{ color: "#D89834" }}>
            Welcome to NutriGuide!
          </h2>
          <p>
            NutriGuide is your trusted platform for nutritional assessment and
            food awareness, designed to help you make informed, healthier
            dietary choices. Built on scientific research and tailored for
            everyday use, our tools provide clear, easy-to-understand insights
            into the nutritional value of your food.
          </p>
          <p>
            Our platform leverages the widely recognized traffic light color
            system:
          </p>
          <ul style={{ marginLeft: "20px", marginBottom: "1rem" }}>
            <li>
              <span style={{ color: "#198754" }}>Green</span> - Healthier
              choices that you can enjoy more often.
            </li>
            <li>
              <span style={{ color: "#ffc107" }}>Amber</span> - Moderate choices
              to consume in balance.
            </li>
            <li>
              <span style={{ color: "#dc3545" }}>Red</span> - Foods to limit for
              a healthier lifestyle.
            </li>
          </ul>
          <p>
            By evaluating key nutritional values such as <em>calories</em>,{" "}
            <em>fats</em>, <em>saturates</em>,<em>sugar</em>, and <em>salt</em>,
            NutriGuide helps you quickly identify the foods that support your
            well-being. Whether you’re planning meals, grocery shopping, or
            improving your diet, our system empowers you to make smarter and
            more conscious eating decisions.
          </p>
          <p
            className="mt-4"
            style={{ fontStyle: "italic", fontSize: "1.1rem" }}
          >
            Start your journey toward a healthier lifestyle with NutriGuide
            today!
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutMore;

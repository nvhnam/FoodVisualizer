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
        <p className="about-more-content">
          Welcome to NutrinSight! We are a source of nutritional information and
          assessment tools to help you better understand the nutritional value
          of food products. The reviews are based on scientific research and
          nutritional guidance, helping you make smart decisions about your
          eating lifestyle. We use the traffic light color system - red, yellow,
          green - to indicate how "healthy" the food is. You will easily know
          which foods you should eat more of and which foods you should limit.
        </p>
      </div>
    </div>
  );
};
export default AboutMore;

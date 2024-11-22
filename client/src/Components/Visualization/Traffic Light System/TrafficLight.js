import { useParams } from "react-router-dom";
import "./TrafficLight.css";
import ListGroup from "react-bootstrap/ListGroup";
import { NutrientsData } from "../Nutrients/NutrientsData";
import "./TrafficLight.css";
import getColor from "../Colors/getColor";

const TrafficLight = ({
  showPerContainer,
  productId = null,
  showText = true,
  mainPage = false,
  theWidth = "",
}) => {
  if (!productId) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams();
    productId = params.productId;
  }
  // const { productId } = useParams();
  const {
    wOneHundredGram,
    wServing,
    perServing,
    wContainer,
    perContainer,
    packSize,
    servingSize,
    packUnit,
    servingUnit,
    energy,
  } = NutrientsData(productId);

  const perDisplay = showPerContainer ? perContainer : perServing;
  const wDisplay = showPerContainer ? wContainer : wServing;
  const textDisplay = showPerContainer ? "container" : "serving";
  const sizeDisplay = showPerContainer ? packSize : servingSize;
  const unitDisplay = showPerContainer ? packUnit : servingUnit;

  return (
    <div className="traf-lgt" style={{ width: theWidth }}>
      {perDisplay &&
        wOneHundredGram &&
        textDisplay &&
        energy &&
        wDisplay &&
        unitDisplay && (
          <div>
            {showText && (
              <h3 className="inf" style={{ textAlign: "center" }}>
                Each {textDisplay} ({sizeDisplay} {unitDisplay}) contains
              </h3>
            )}
            {mainPage ? (
              <ListGroup
                horizontal
                // style={{ height: "10rem", marginLeft: "2rem" }}
                // className="mb-3 d-flex gap-1"
                className="nutrition-list"
              >
                {Object.entries(perDisplay).map(
                  ([label, percentage], index) => (
                    <ListGroup.Item
                      key={label}
                      // className="item-color p-1 rounded px-1 py-1"
                      className="nutrition-item"
                      style={{
                        backgroundColor: getColor(
                          label,
                          wOneHundredGram[label],
                          wDisplay[label],
                          sizeDisplay,
                          unitDisplay
                        ),
                      }}
                    >
                      <h6
                        // className="text-dark fs-6 text-center"
                        className="nutrition-name"
                      >{label}</h6>
                      <h6
                        // style={{
                        //   marginTop: "1rem",
                        // }}
                        // className="text-dark fs-6 text-center"
                        className="nutrition-amount"
                      >
                        {wDisplay[label]}g
                      </h6>
                      {/* <hr className="my-2 w-100"></hr> */}
                      <h6 
                        className="nutrition-percentage"
                        // className="text-dark fs-6 text-center"
                      >
                        {percentage}%
                      </h6>
                    </ListGroup.Item>
                  )
                )}
              </ListGroup>
            ) : (
              <ListGroup
                horizontal
                style={{ height: "10rem", marginLeft: "2rem" }}
              >
                {Object.entries(perDisplay).map(
                  ([label, percentage], index) => (
                    <ListGroup.Item
                      key={label}
                      className="item-color"
                      style={{
                        backgroundColor: getColor(
                          label,
                          wOneHundredGram[label],
                          wDisplay[label],
                          sizeDisplay,
                          unitDisplay
                        ),
                      }}
                    >
                      <h3>{label}</h3>
                      <h2
                        style={{
                          marginTop: "1rem",
                        }}
                      >
                        {wDisplay[label]}g
                      </h2>
                      <hr></hr>
                      <h2>{percentage}%</h2>
                    </ListGroup.Item>
                  )
                )}
              </ListGroup>
            )}
            {showText && (
              <>
                <h3
                  className="inf"
                  style={{ textAlign: "center", fontWeight: "bold" }}
                >
                  of an adult's reference intake
                </h3>
                <h3 className="inf">
                  Typical values (as sold) per 100g: Energy {energy.Energy} KJ /
                  {energy.Calories} Kcal{" "}
                </h3>
              </>
            )}
          </div>
        )}
    </div>
  );
};

export default TrafficLight;

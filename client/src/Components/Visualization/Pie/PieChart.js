import { useParams } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import "./PieChart.css";
import { NutrientsData } from "../Nutrients/NutrientsData.js";
import getColor from "../Colors/getColor.js";

function PieChart({ showPerContainer }) {
  const { productId } = useParams();
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
  if (!energy) {
    console.error("Energy data is null");
    return <div>Energy data not available</div>;
  }
  const perDisplay = showPerContainer ? perContainer : perServing;
  const wDisplay = showPerContainer ? wContainer : wServing;
  const textDisplay = showPerContainer ? "container" : "serving";
  const sizeDisplay = showPerContainer ? packSize : servingSize;
  const unitDisplay = showPerContainer ? packUnit : servingUnit;

  return (
    <div className="" style={{ width: "36rem" }}>
      {perDisplay && wOneHundredGram && wDisplay && unitDisplay && (
        <>
          <h3 className="inf" style={{ textAlign: "center" }}>
            Each {textDisplay} ({sizeDisplay} {unitDisplay}) contains
          </h3>
          <div className="pie-style">
            {Object.entries(perDisplay).map(([label, data], index) => (
              <div
                key={index}
                style={{ width: "8rem", marginLeft: "1rem" }}
                className="pie-item"
              >
                <Pie
                  data={{
                    labels: [label, "Remaining"],
                    datasets: [
                      {
                        label: label,
                        data: [data, (100 - data).toFixed(1)],
                        backgroundColor: [
                          getColor(
                            label,
                            wOneHundredGram[label],
                            wDisplay[label],
                            sizeDisplay,
                            unitDisplay
                          ),
                          "rgba(245, 39, 145, 0)",
                        ],
                        borderWidth: 1,
                        borderColor: getColor(
                          label,
                          wOneHundredGram[label],
                          wDisplay[label],
                          sizeDisplay,
                          unitDisplay
                        ),
                        // borderColor: "#000000",
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                        labels: {
                          font: {
                            size: 20,
                          },
                          color: "black",
                        },
                      },
                      tooltip: {
                        bodyFont: {
                          size: 20,
                        },
                        padding: 5,
                        boxWidth: 20,
                        boxHeight: 20,
                        callbacks: {
                          label: function (context) {
                            const columnName = context.label;
                            if (columnName === "Remaining") {
                              return `${(100 - context.dataset.data[0]).toFixed(
                                1
                              )}%`;
                            } else {
                              const wValue = wDisplay[columnName];
                              return `${wValue}g`;
                            }
                          },
                        },
                      },
                      datalabels: {
                        display: true,
                        formatter: function (value) {
                          return `${value}%`;
                        },
                        font: {
                          size: 20,
                        },
                        color: "black",
                        // align: "end",
                        // anchor: "end",
                      },
                    },
                  }}
                />
                <h3
                  style={{
                    textAlign: "center",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  {label}
                </h3>
              </div>
            ))}
          </div>
          <h3
            className="inf"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            of an adult's reference intake
          </h3>
          <h3 className="inf" style={{ marginLeft: "1rem" }}>
            Typical values (as sold) per 100{unitDisplay}: Energy{" "}
            {energy?.Energy} KJ / {energy?.Calories} Kcal
          </h3>
        </>
      )}
    </div>
  );
}

export default PieChart;

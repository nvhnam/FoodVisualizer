import { useParams } from "react-router-dom";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { NutrientsData } from "../Nutrients/NutrientsData";
import ChartDataLabels from "chartjs-plugin-datalabels";
import getColor from "../Colors/getColor";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

function PolarChart({ showPerContainer }) {
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
    <div style={{ width: "38rem" }}>
      <h3 className="inf" style={{ textAlign: "center" }}>
        Each {textDisplay} ({sizeDisplay} {unitDisplay}) contains
      </h3>
      <div style={{ width: "18rem", marginLeft: "6rem" }}>
        {perDisplay && wOneHundredGram && wDisplay && unitDisplay ? (
          <PolarArea
            radius={150}
            data={{
              datasets: [
                {
                  data: Object.values(perDisplay),
                  backgroundColor: Object.keys(wOneHundredGram).map((label) =>
                    getColor(
                      label,
                      wOneHundredGram[label],
                      wDisplay[label],
                      sizeDisplay,
                      unitDisplay
                    )
                      .replace("rgb", "rgba")
                      .replace(")", ", 0.7)")
                  ),
                  borderWidth: 1,
                  borderColor: "#ffffff",
                  label: [""],
                },
              ],
              labels: Object.keys(perDisplay),
            }}
            options={{
              plugins: {
                tooltip: {
                  bodyFont: {
                    size: 20,
                  },
                  callbacks: {
                    label: function (context) {
                      const columnName = context.label;
                      const wValue = wDisplay[columnName];
                      return `${wValue}g`;
                    },
                  },
                },
                legend: {
                  display: false,
                },
                datalabels: {
                  anchor: "start",
                  align: "end",
                  // backgroundColor: function (context) {
                  //   return context.dataset.backgroundColor;
                  // },
                  // borderColor: "white",
                  borderRadius: 25,
                  borderWidth: 2,
                  color: "black",
                  font: {
                    size: 20,
                  },
                  formatter: function (value, context) {
                    return `${
                      context.chart.data.labels[context.dataIndex]
                    }: ${value}%`;
                  },
                  padding: 6,
                  listeners: {
                    click: function (context) {
                      console.log(context);
                    },
                  },
                  clip: false,
                  offset: 20,
                },
              },
              scales: {
                r: {
                  min: 0,
                  ticks: {
                    font: {
                      size: 10,
                    },
                    color: "black",
                  },
                },
              },
            }}
          />
        ) : (
          <span>Not Found</span>
        )}
      </div>
      <h3 className="inf" style={{ textAlign: "center", fontWeight: "bold" }}>
        of an adult's reference intake
      </h3>
      <h3 className="inf" style={{ marginLeft: "1rem" }}>
        Typical values (as sold) per 100{unitDisplay}: Energy {energy.Energy}J/
        {energy.Calories}cal{" "}
      </h3>
    </div>
  );
}

export default PolarChart;

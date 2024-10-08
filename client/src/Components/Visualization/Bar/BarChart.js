import React from "react";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { NutrientsData } from "../Nutrients/NutrientsData.js";
import getColor from "../Colors/getColor.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const drawHorizontalLine = {
  id: "draw-horizontal-line",
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const yAxis = chart.scales["y"];

    if (!yAxis) return;

    const yValue = 100;
    const xStart = chart.chartArea.left;
    const xEnd = chart.chartArea.right;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(xStart, yAxis.getPixelForValue(yValue));
    ctx.lineTo(xEnd, yAxis.getPixelForValue(yValue));
    ctx.lineWidth = 1;
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.restore();
  },
};

ChartJS.register(drawHorizontalLine);

function BarChart({ showPerContainer }) {
  const { productId } = useParams();
  const {
    wOneHundredGram,
    // wServing,
    // perServing,
    wContainer,
    perContainer,
    packSize,
    // servingSize,
    packUnit,
    // servingUnit,
    energy,
  } = NutrientsData(productId);
  if (!energy) {
    console.error("Energy data is null");
    return <div>Energy data not available</div>;
  }
  // const perDisplay = showPerContainer ? perContainer : perServing;
  // const wDisplay = showPerContainer ? wContainer : wServing;
  // const textDisplay = showPerContainer ? "container" : "serving";
  // const sizeDisplay = showPerContainer ? packSize : servingSize;
  // const unitDisplay = showPerContainer ? packUnit : servingUnit;
  const perDisplay = perContainer;
  const wDisplay = wContainer;
  const textDisplay = "container";
  const sizeDisplay = packSize;
  const unitDisplay = packUnit;

  return (
    <div style={{ width: "36rem" }}>
      <h3 className="inf" style={{ textAlign: "center" }}>
        Each {textDisplay} ({sizeDisplay} {unitDisplay}) contains
      </h3>
      {perDisplay &&
      wOneHundredGram &&
      wDisplay &&
      sizeDisplay &&
      unitDisplay ? (
        <Bar
          data={{
            labels: Object.keys(perDisplay),

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
                ),
              },
            ],
          }}
          options={{
            plugins: {
              datalabels: {
                formatter: function (value) {
                  return `${value}%`;
                },
                font: {
                  size: 20,
                },
                color: "black",
                anchor: "end",
                align: "end",
              },
              tooltip: {
                bodyFont: {
                  size: 20, // Text trong tooltip
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
            },
            scales: {
              x: {
                stacked: true,
                ticks: {
                  font: {
                    size: 20,
                  },
                  color: "black",
                },
              },
              y: {
                stacked: true,
                max: 120,
                ticks: {
                  font: {
                    size: 20,
                  },
                  color: "black",
                },
                position: "top",
                title: {
                  display: true,
                  text: "% Reference Intakes",
                  font: {
                    size: 16,
                    color: "black",
                  },
                },
              },
            },
          }}
        />
      ) : (
        <span>There is no data to display</span>
      )}
      <h3 className="inf" style={{ textAlign: "center", fontWeight: "bold" }}>
        of an adult's reference intake
      </h3>
      <h3 className="inf" style={{ marginLeft: "1rem" }}>
        Typical values (as sold) per 100{unitDisplay}: Energy {energy.Energy}kJ/
        {energy.Calories}kcal{" "}
      </h3>
    </div>
  );
}

export default BarChart;

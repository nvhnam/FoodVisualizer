const getColor = (
  label,
  valuePer100g,
  valuePerPortion,
  sizeDisplay,
  unitDisplay
) => {
  const thresholds = {
    grams: {
      fat: { LOW: 3.0, MEDIUM: 17.5, HIGH_100G: 17.5, HIGH_PORTION: 21.0 },
      saturates: { LOW: 1.5, MEDIUM: 5.0, HIGH_100G: 5.0, HIGH_PORTION: 6.0 },
      sugars: { LOW: 5.0, MEDIUM: 22.5, HIGH_100G: 22.5, HIGH_PORTION: 27.0 },
      salt: { LOW: 0.3, MEDIUM: 1.5, HIGH_100G: 1.5, HIGH_PORTION: 1.8 },
    },
    ml: {
      fat: { LOW: 1.5, MEDIUM: 8.75, HIGH_100G: 8.75, HIGH_PORTION: 10.5 },
      saturates: { LOW: 0.75, MEDIUM: 2.5, HIGH_100G: 2.5, HIGH_PORTION: 3.0 },
      sugars: { LOW: 2.5, MEDIUM: 11.25, HIGH_100G: 11.25, HIGH_PORTION: 13.5 },
      salt: { LOW: 0.15, MEDIUM: 0.75, HIGH_100G: 0.75, HIGH_PORTION: 0.9 },
    },
  };

  const unitThresholds = thresholds[unitDisplay];
  //  || thresholds.g;

  let nutrient = label.toLowerCase();
  let color = "#7BC35F";

  console.log(
    `Nutrient: ${nutrient}, Value: ${valuePer100g}, Thresholds:`,
    unitThresholds[nutrient]
  );

  if (nutrient in unitThresholds) {
    const isHighPortion =
      sizeDisplay > 100 &&
      valuePerPortion > unitThresholds[nutrient]["HIGH_PORTION"];
    if (valuePer100g > unitThresholds[nutrient]["HIGH_100G"] || isHighPortion) {
      color = "#F15829";
    } else if (valuePer100g > unitThresholds[nutrient]["LOW"]) {
      color = "#FBAF3E";
    }
  }

  return color;
};

export default getColor;

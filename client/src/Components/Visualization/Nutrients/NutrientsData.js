import { useState, useEffect } from "react";
import axios from "axios";

const split = (input) => {
  const match = input.match(/([\d.]+)([a-zA-Z]+)/);
  if (match) {
    return { value: parseFloat(match[1]), unit: match[2].toLowerCase() };
  }
  return { value: null, unit: null };
};

const convert = (value, unit) => {
  if (unit === "kg") {
    value *= 1000;
    unit = "grams";
  } else if (unit === "l" || unit === "litre") {
    value *= 1000;
    unit = "ml";
  } else if (unit === "g" || unit === "gr" || unit === "gram") {
    unit = "grams";
  } else if (unit === "oz") {
    value *= 28.3495;
    unit = "grams";
  } else if (unit === "lbs" || unit === "lb") {
    value *= 453.592;
    unit = "grams";
  }
  return { value, unit };
};

export const NutrientsData = (productId) => {
  const [wOneHundredGram, setWOneHundredGram] = useState(null);
  const [wServing, setWServing] = useState(null);
  const [perServing, setPerServing] = useState(null);
  const [wContainer, setWContainer] = useState(null);
  const [perContainer, setPerContainer] = useState(null);
  const [packSize, setPackSize] = useState(null);
  const [servingSize, setServingSize] = useState(null);
  const [packUnit, setPackUnit] = useState(null);
  const [servingUnit, setServingUnit] = useState(null);
  const [energy, setEnergy] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8008/product-nutrients/${productId}`
        );
        const nutrition_data = response.data;
        // console.log("Fecth single Data: ", nutrition_data);

        const packSizeData = split(nutrition_data.pack_size);
        const servingSizeData = split(nutrition_data.serving_size);

        const { value: packSize, unit: packUnit } = convert(
          packSizeData.value,
          packSizeData.unit
        );
        const { value: servingSize, unit: servingUnit } = convert(
          servingSizeData.value,
          servingSizeData.unit
        );

        setPackSize(packSize);
        setServingSize(servingSize);
        setPackUnit(packUnit);
        setServingUnit(servingUnit);

        // khối lượng chất trong 100 g or 100 ml
        const wOneHundredGram = {
          Fat: nutrition_data.fat,
          Saturates: nutrition_data.saturates,
          Sugars: nutrition_data.sugars,
          Salt: nutrition_data.salt,
        };
        setWOneHundredGram(wOneHundredGram);

        // khối lượng chất trong 1 serving
        const wServing = {
          Fat: ((wOneHundredGram.Fat * servingSize) / 100).toFixed(1),
          Saturates: ((wOneHundredGram.Saturates * servingSize) / 100).toFixed(
            1
          ),
          Sugars: ((wOneHundredGram.Sugars * servingSize) / 100).toFixed(1),
          Salt: ((wOneHundredGram.Salt * servingSize) / 100).toFixed(1),
        };
        setWServing(wServing);

        // %RI trong 1 serving
        const perServing = {
          Fat: ((wServing.Fat / 70) * 100).toFixed(1),
          Saturates: ((wServing.Saturates / 20) * 100).toFixed(1),
          Sugars: ((wServing.Sugars / 90) * 100).toFixed(1),
          Salt: ((wServing.Salt / 6) * 100).toFixed(1),
        };
        setPerServing(perServing);

        // khối lượng chất trong 1 container
        const wContainer = {
          Fat: ((wOneHundredGram.Fat * packSize) / 100).toFixed(1),
          Saturates: ((wOneHundredGram.Saturates * packSize) / 100).toFixed(1),
          Sugars: ((wOneHundredGram.Sugars * packSize) / 100).toFixed(1),
          Salt: ((wOneHundredGram.Salt * packSize) / 100).toFixed(1),
        };
        setWContainer(wContainer);

        // %RI trong 1 container
        const perContainer = {
          Fat: ((wContainer.Fat / 70) * 100).toFixed(1),
          Saturates: ((wContainer.Saturates / 20) * 100).toFixed(1),
          Sugars: ((wContainer.Sugars / 90) * 100).toFixed(1),
          Salt: ((wContainer.Salt / 6) * 100).toFixed(1),
        };
        setPerContainer(perContainer);

        const energy = {
          Energy: nutrition_data.energy,
          Calories: nutrition_data.calories,
        };
        setEnergy(energy);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId]);

  return {
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
  };
};

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from "rsuite";

const PORT = process.env.REACT_APP_PORT;
const URL = process.env.REACT_APP_URL || `http://localhost:${PORT}`;

const Category = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${URL}/categories`);
        const uniqueCategories = getUniqueCategories(response.data);
        // console.log("Filtered products:", response.data);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // const processData = (data) => {
  //   const categoriesMap = {};

  //   data.forEach((item) => {
  //     const { level_0, level_1, level_2 } = item;

  //     if (!categoriesMap[level_0]) {
  //       categoriesMap[level_0] = { level0: level_0, children: [] };
  //     }

  //     if (
  //       level_1 &&
  //       !categoriesMap[level_0].children.find((c) => c.level1 === level_1)
  //     ) {
  //       categoriesMap[level_0].children.push({ level1: level_1, children: [] });
  //     }

  //     if (level_2) {
  //       const level1Category = categoriesMap[level_0].children.find(
  //         (c) => c.level1 === level_1
  //       );
  //       if (level1Category) {
  //         level1Category.children.push({ level2: level_2 });
  //       }
  //     }
  //   });

  //   return Object.values(categoriesMap);
  // };

  // const handleCategorySelect = (level0, level1, level2) => {
  //   onSelectCategory([level0, level1, level2]);
  // };

  const handleCategorySelect = (level0) => {
    onSelectCategory(level0);
  };

  // const renderLevel2Items = (level2Categories, level0, level1) => {
  //   if (!level2Categories || level2Categories.length === 0) {
  //     return null;
  //   }

  //   return level2Categories.map((category, index) => (
  //     <Dropdown.Item
  //       key={index}
  //       onClick={() => handleCategorySelect(level0, level1, category.level2)}
  //     >
  //       {category.level2}
  //     </Dropdown.Item>
  //   ));
  // };

  // const renderLevel1Dropdowns = (level1Categories, level0) => {
  //   if (!level1Categories || level1Categories.length === 0) {
  //     return null;
  //   }

  //   return level1Categories.map((category, index) => (
  //     <Dropdown.Menu key={index} title={category.level1}>
  //       <Dropdown.Item
  //         onClick={() => handleCategorySelect(level0, category.level1, null)}
  //       >
  //         *{category.level1}
  //       </Dropdown.Item>
  //       {renderLevel2Items(category.children, level0, category.level1)}
  //     </Dropdown.Menu>
  //   ));
  // };

  const getUniqueCategories = (data) => {
    const uniqueCategorySet = new Set();
    return data.filter((item) => {
      if (!uniqueCategorySet.has(item.level_0)) {
        uniqueCategorySet.add(item.level_0);
        return true;
      }
      return false;
    });
  };

  const renderLevel0Dropdowns = (categories) => {
    if (!categories || categories.length === 0) {
      return null;
    }

    return categories.map((category, index) => (
      <Dropdown.Item
        key={index}
        onClick={() => handleCategorySelect(category.level_0)}
      >
        {category.level_0}
      </Dropdown.Item>
    ));
  };

  return (
    <Dropdown title="Categories" trigger="hover">
      {renderLevel0Dropdowns(categories)}
    </Dropdown>
  );
};

export default Category;

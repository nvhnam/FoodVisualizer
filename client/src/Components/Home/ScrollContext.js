import React, { createContext, useContext, useRef } from "react";
import PropTypes from "prop-types";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const aboutRef = useRef();

  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ScrollContext.Provider value={{ scrollToAbout, aboutRef }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Add prop type validation for children
ScrollProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useScroll = () => {
  return useContext(ScrollContext);
};

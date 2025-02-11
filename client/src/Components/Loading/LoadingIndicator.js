import React from "react";
import Loading from "./Loading";

const LoadingIndicator = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loading />
    </div>
  );
};

export default LoadingIndicator;

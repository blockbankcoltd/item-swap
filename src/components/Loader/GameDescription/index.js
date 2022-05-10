import React from "react";
import Dark from "./Dark";
import Light from "./Light";

const GameDescription = () => {
  const theme = localStorage.getItem("theme");
  if (theme === "light") return <Light />;

  return <Dark />;
};

export default GameDescription;

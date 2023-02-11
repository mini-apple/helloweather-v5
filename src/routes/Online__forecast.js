import React from "react";
import Forecasting from "components/forecast/Forecasting";
import Home from "./Home";

const Online__forecast = ({ userObj, isLoggedIn }) => {
  return <>{isLoggedIn ? <Forecasting userObj={userObj} /> : <Home />}</>;
};

export default Online__forecast;

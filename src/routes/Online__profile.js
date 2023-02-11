import React from "react";
import SetProfile from "components/profile/SetProfile";
import Home from "./Home";

const Online__profile = ({ userObj, isLoggedIn }) => {
  return <>{isLoggedIn ? <SetProfile userObj={userObj} /> : <Home />}</>;
};

export default Online__profile;

import React from "react";
import ShowResult from "components/result/ShowResult";
import Home from "./Home";

const Online__result = ({ userObj, isLoggedIn, date, setDate }) => {
  return (
    <>
      {isLoggedIn ? (
        <ShowResult userObj={userObj} date={date} setDate={setDate} />
      ) : (
        <Home />
      )}
    </>
  );
};

export default Online__result;

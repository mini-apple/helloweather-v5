import React from "react";
import MemberStatus from "components/member/MemberStatus";
import Home from "./Home";

const Online__member = ({ isLoggedIn }) => {
  return <>{isLoggedIn ? <MemberStatus /> : <Home />}</>;
};

export default Online__member;

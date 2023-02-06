import React from "react";
import MemberStatus from "components/member/MemberStatus";
import Home from "./Home";

const Online__member = ({ isLoggedin }) => {
  return <>{isLoggedin ? <MemberStatus /> : <Home />}</>;
};

export default Online__member;

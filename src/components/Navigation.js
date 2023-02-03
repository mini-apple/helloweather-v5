import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navigation-container">
      <ul className="nav-ul">
        <Box className="navigation-home">
          <li>
            <Link to="/" className="nav-li">
              Hello Weather
            </Link>
          </li>
        </Box>
        <Box className="navigation-online">
          <li>
            <Link to="/calc" className="nav-li">
              멤버
            </Link>
          </li>
        </Box>
        <Box className="navigation-offline">
          <Box className="navigation-title">오프라인</Box>
          <Divider />
          <li>
            <Link to="/calc" className="nav-li">
              채점하기
            </Link>
          </li>
          <Divider />
          <li>
            <Link to="/string" className="nav-li">
              정답코드
            </Link>
          </li>
          <Divider />
          <li>
            <Link to="/criteria" className="nav-li">
              채점기준
            </Link>
          </li>
        </Box>
      </ul>
    </nav>
  );
};

export default Navigation;

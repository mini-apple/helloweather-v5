import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Hello Weather</Link>
        </li>
        <li>
          <Link to="/calc">채점하기</Link>
        </li>
        <li>
          <Link to="/string">정답코드</Link>
        </li>
        <li>
          <Link to="/criteria">채점기준</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

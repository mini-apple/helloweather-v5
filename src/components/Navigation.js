import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/calc">calc</Link>
        </li>
        <li>
          <Link to="/string">string</Link>
        </li>
        <li>
          <Link to="/criteria">criteria</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

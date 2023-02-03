import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Offline__calc from "routes/Offline__calc";
import Offline__criteria from "routes/Offline__criteria";
import Offline__string from "routes/Offline__string";
import Navigation from "components/Navigation";
import Box from "@mui/material/Box";

const AppRouter = ({ isLoggedin, setIsLoggedIn }) => {
  return (
    <BrowserRouter>
      <Box className="main-a">
        <Box className="main-b">
          <Navigation />
        </Box>
        <Box className="main-c">
          <Routes>
            <Route
              path="/"
              element={
                <Home isLoggedin={isLoggedin} setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route path="/calc" element={<Offline__calc />} />
            <Route path="/criteria" element={<Offline__criteria />} />
            <Route path="/string" element={<Offline__string />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default AppRouter;

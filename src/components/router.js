import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Online__profile from "routes/Online__profile";
import Online__member from "routes/Online__member";
import Offline__calc from "routes/Offline__calc";
import Offline__criteria from "routes/Offline__criteria";
import Offline__string from "routes/Offline__string";
import Navigation from "components/Navigation";
import Box from "@mui/material/Box";
import Online__forecast from "routes/Online__forecast";
import Online__result from "routes/Online__result";

const AppRouter = ({ isLoggedIn, setIsLoggedIn, userObj }) => {
  return (
    <BrowserRouter>
      <Box className="main-a">
        <Box className="main-b">
          <Navigation isLoggedIn={isLoggedIn} userObj={userObj} />
        </Box>
        <Box className="main-c">
          <Routes>
            <Route
              path="/"
              element={
                <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route
              path="/profile"
              element={
                <Online__profile userObj={userObj} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path="/member"
              element={<Online__member isLoggedIn={isLoggedIn} />}
            />
            <Route
              path="/forecast"
              element={
                <Online__forecast userObj={userObj} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path="/result"
              element={
                <Online__result userObj={userObj} isLoggedIn={isLoggedIn} />
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

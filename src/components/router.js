import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Offline__calc from "routes/Offline__calc";
import Offline__criteria from "routes/Offline__criteria";
import Offline__string from "routes/Offline__string";
import Navigation from "components/Navigation";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calc" element={<Offline__calc />} />
        <Route path="/criteria" element={<Offline__criteria />} />
        <Route path="/string" element={<Offline__string />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

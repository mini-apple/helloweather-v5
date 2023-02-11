import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const ForecastCard = ({ gameAttrObj, setShowInput, setInputObj }) => {
  const onGameClick = () => {
    setShowInput(true);
    setInputObj(gameAttrObj);
  };

  return (
    <Box className="forecast-card-container">
      <Box>일시: {gameAttrObj.forecastDate}</Box>
      <Box>인도자: {gameAttrObj.leaderName}</Box>
      <Box>제출됨: {Object.keys(gameAttrObj.userAnswerObj).length}</Box>

      {gameAttrObj.forecastStatus ? (
        <Button
          variant="outlined"
          color="success"
          size="small"
          onClick={onGameClick}
        >
          진행중
        </Button>
      ) : (
        <Button variant="outlined" size="small" color="secondary">
          결과보기
        </Button>
      )}
    </Box>
  );
};

export default ForecastCard;

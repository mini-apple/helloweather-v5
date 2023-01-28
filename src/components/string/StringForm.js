import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import ExplainString from "components/string/ExplainString";
import InputCloudiness from "components/input/InputCloudiness";
import InputWindDiriction from "components/input/InputWindDirenction";
import InputWindSpeed from "components/input/InputWindSpeed";
import InputTemperature from "components/input/InputTemperature";
import InputPrecipitation from "components/input/InputPrecipitation";

import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

function StringForm() {
  const [L1, setL1] = useState({
    cloudiness: null,
    windDirection: null,
    windSpeed: null,
    temperature: null,
    precipitation: null,
  });
  const [L2, setL2] = useState({
    cloudiness: null,
    windDirection: null,
    windSpeed: null,
    temperature: null,
    precipitation: null,
  });

  const [string, setString] = useState("");

  const onConvert = () => {
    if (L1.cloudiness === null || L1.windDirection === null) {
      alert("미입력항목 존재!");
      return;
    }
    setString(
      `${L1.cloudiness}/${L1.windDirection}/${L1.windSpeed}/${L1.temperature}/${L1.precipitation}/${L2.cloudiness}/${L2.windDirection}/${L2.windSpeed}/${L2.temperature}/${L2.precipitation}`
    );
    console.log(L1);
  };

  const onCopy = () => {
    navigator.clipboard.writeText(string);
  };

  return (
    <>
      <Box className="container">
        <Box className="title">정답코드</Box>
        <ExplainString />
      </Box>
      <Box className="container">
        <Box className="title">답안 입력하기</Box>
        <Box className="input-container">
          <Box className="location-container">
            <Box className="string-location-title">지역1</Box>
            <InputCloudiness data={L1} setData={setL1} />
            <InputWindDiriction data={L1} setData={setL1} />
            <InputWindSpeed data={L1} setData={setL1} />
            <InputTemperature data={L1} setData={setL1} />
            <InputPrecipitation data={L1} setData={setL1} />
          </Box>

          <Box className="location-container">
            <Box className="string-location-title">지역2</Box>
            <InputCloudiness data={L2} setData={setL2} />
            <InputWindDiriction data={L2} setData={setL2} />
            <InputWindSpeed data={L2} setData={setL2} />
            <InputTemperature data={L2} setData={setL2} />
            <InputPrecipitation data={L2} setData={setL2} />
          </Box>
        </Box>

        <Box className="string-convert-button">
          <Button fullWidth variant="outlined" size="small" onClick={onConvert}>
            create
          </Button>
        </Box>
      </Box>

      <Box className="container">
        <Box className="title">정답코드 복사하기</Box>
        <Box className="string-code-container">
          <Box className="string-code-padding">정답코드 </Box>
          <Box>{string}</Box>
          <IconButton onClick={onCopy}>
            <ContentCopyRoundedIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
export default StringForm;

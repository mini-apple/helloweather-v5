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

  const [text0, setText0] = useState("");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [text3, setText3] = useState("");
  const [text4, setText4] = useState("");
  const [text5, setText5] = useState("");
  const [text6, setText6] = useState("");
  const [text7, setText7] = useState("");
  const [text8, setText8] = useState("");
  const [text9, setText9] = useState("");

  const [string, setString] = useState("");

  const onConvert = () => {
    if (
      L1.cloudiness === null ||
      L1.windDirection === null ||
      L1.windSpeed === null ||
      L1.temperature === null ||
      L1.precipitation === null ||
      L2.cloudiness === null ||
      L2.windDirection === null ||
      L2.windSpeed === null ||
      L2.temperature === null ||
      L2.precipitation === null
    ) {
      alert("입력되지 않은 항목이 있습니다. \n모든 항목을 입력해주세요!");
      return;
    }
    const plainText = `${L1.cloudiness}/${L1.windDirection}/${L1.windSpeed}/${L1.temperature}/${L1.precipitation}/${L2.cloudiness}/${L2.windDirection}/${L2.windSpeed}/${L2.temperature}/${L2.precipitation}`;
    setString(plainText);
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
            <InputCloudiness
              data={L1}
              setData={setL1}
              text={text0}
              setText={setText0}
            />
            <InputWindDiriction
              data={L1}
              setData={setL1}
              text={text1}
              setText={setText1}
            />
            <InputWindSpeed
              data={L1}
              setData={setL1}
              text={text2}
              setText={setText2}
            />
            <InputTemperature
              data={L1}
              setData={setL1}
              text={text3}
              setText={setText3}
            />
            <InputPrecipitation
              data={L1}
              setData={setL1}
              text={text4}
              setText={setText4}
            />
          </Box>

          <Box className="location-container">
            <Box className="string-location-title">지역2</Box>
            <InputCloudiness
              data={L2}
              setData={setL2}
              text={text5}
              setText={setText5}
            />
            <InputWindDiriction
              data={L2}
              setData={setL2}
              text={text6}
              setText={setText6}
            />
            <InputWindSpeed
              data={L2}
              setData={setL2}
              text={text7}
              setText={setText7}
            />
            <InputTemperature
              data={L2}
              setData={setL2}
              text={text8}
              setText={setText8}
            />
            <InputPrecipitation
              data={L2}
              setData={setL2}
              text={text9}
              setText={setText9}
            />
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

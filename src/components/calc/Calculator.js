import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import InputCloudiness from "components/input/InputCloudiness";
import InputWindDiriction from "components/input/InputWindDirenction";
import InputWindSpeed from "components/input/InputWindSpeed";
import InputTemperature from "components/input/InputTemperature";
import InputPrecipitation from "components/input/InputPrecipitation";

function Calculator() {
  const [location1, setLocation1] = useState({
    cloudiness: null,
    windDirection: null,
    windSpeed: null,
    temperature: null,
    precipitation: null,
  });
  const [location2, setLocation2] = useState({
    cloudiness: null,
    windDirection: null,
    windSpeed: null,
    temperature: null,
    precipitation: null,
  });

  return (
    <Box component="form" noValidate autoComplete="off">
      <TextField id="outlined-basic" label="정답코드" variant="outlined" />
      <Button variant="outlined">정답입력</Button>
      <InputCloudiness />
      <InputWindDiriction />
      <InputWindSpeed />
      <InputTemperature />
      <InputPrecipitation />
    </Box>
  );
}

export default Calculator;

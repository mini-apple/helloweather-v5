import React, { useState } from "react";
import Button from "@mui/material/Button";
import InputCloudiness from "components/input/InputCloudiness";
import InputWindDiriction from "components/input/InputWindDirenction";
import InputWindSpeed from "components/input/InputWindSpeed";
import InputTemperature from "components/input/InputTemperature";
import InputPrecipitation from "components/input/InputPrecipitation";

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
      지역1
      <InputCloudiness data={L1} setData={setL1} />
      <InputWindDiriction data={L1} setData={setL1} />
      <InputWindSpeed data={L1} setData={setL1} />
      <InputTemperature data={L1} setData={setL1} />
      <InputPrecipitation data={L1} setData={setL1} />
      지역2
      <InputCloudiness data={L2} setData={setL2} />
      <InputWindDiriction data={L2} setData={setL2} />
      <InputWindSpeed data={L2} setData={setL2} />
      <InputTemperature data={L2} setData={setL2} />
      <InputPrecipitation data={L2} setData={setL2} />
      <Button variant="contained" onClick={onConvert}>
        Convert
      </Button>
      <div>정답코드: {string}</div>
      <Button variant="contained" onClick={onCopy}>
        Copy!
      </Button>
    </>
  );
}
export default StringForm;

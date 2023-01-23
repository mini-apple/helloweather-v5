import React, { useState } from "react";
import Button from "@mui/material/Button";
import InputCloudiness from "components/input/InputCloudiness";
import InputWindDiriction from "components/input/InputWindDirenction";
import InputWindSpeed from "components/input/InputWindSpeed";
import InputTemperature from "components/input/InputTemperature";
import InputPrecipitation from "components/input/InputPrecipitation";

function StringForm() {
  const [cloudinessA1, setCloudinessA1] = useState("");
  const [cloudinessA2, setCloudinessA2] = useState("");
  const [windDirectionA1, setWindDirectionA1] = useState("");
  const [windDirectionA2, setWindDirectionA2] = useState("");
  const [windSpeedA1, setWindSpeedA1] = useState("");
  const [windSpeedA2, setWindSpeedA2] = useState("");
  const [temperatureA1, setTemperatureA1] = useState("");
  const [temperatureA2, setTemperatureA2] = useState("");
  const [precipitationA1, setPrecipitationA1] = useState("");
  const [precipitationA2, setPrecipitationA2] = useState("");

  const [string, setString] = useState("");

  const onConvert = () => {
    setString(
      `${cloudinessA1}/${windDirectionA1}/${windSpeedA1}/${temperatureA1}/${precipitationA1}/${cloudinessA2}/${windDirectionA2}/${windSpeedA2}/${temperatureA2}/${precipitationA2}`
    );
  };

  const onCopy = () => {
    navigator.clipboard.writeText(string);
  };
  return (
    <>
      지역1
      <InputCloudiness
        cloudiness={cloudinessA1}
        setCloudiness={setCloudinessA1}
      />
      <InputWindDiriction
        windDirection={windDirectionA1}
        setWindDirection={setWindDirectionA1}
      />
      <InputWindSpeed windSpeed={windSpeedA1} setWindSpeed={setWindSpeedA1} />
      <InputTemperature
        temperature={temperatureA1}
        setTemperature={setTemperatureA1}
      />
      <InputPrecipitation
        precipitation={precipitationA1}
        setPrecipitation={setPrecipitationA1}
      />
      지역2
      <InputCloudiness
        cloudiness={cloudinessA2}
        setCloudiness={setCloudinessA2}
      />
      <InputWindDiriction
        windDirection={windDirectionA2}
        setWindDirection={setWindDirectionA2}
      />
      <InputWindSpeed windSpeed={windSpeedA2} setWindSpeed={setWindSpeedA2} />
      <InputTemperature
        temperature={temperatureA2}
        setTemperature={setTemperatureA2}
      />
      <InputPrecipitation
        precipitation={precipitationA2}
        setPrecipitation={setPrecipitationA2}
      />
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

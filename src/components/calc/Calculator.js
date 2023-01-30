import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";

import StringInput from "components/calc/StringInput";
import InputCloudiness from "components/input/InputCloudiness";
import InputWindDiriction from "components/input/InputWindDirenction";
import InputWindSpeed from "components/input/InputWindSpeed";
import InputTemperature from "components/input/InputTemperature";
import InputPrecipitation from "components/input/InputPrecipitation";

function Calculator() {
  const [answer, setAnswer] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [input, setInput] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [diff, setDiff] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [result, setResult] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [score, setScore] = useState(0);

  const [evid, setEvid] = useState(50);

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

  // 근거개수입력
  const onEvidChange = (event) => {
    const {
      target: { value },
    } = event;
  };

  const onScore = () => {};

  return (
    <Box>
      <Box className="container">
        <Box className="title">정답코드 입력하기</Box>
        <StringInput setAnswer={setAnswer} />
      </Box>

      <Box className="container">
        <Box className="title">나의 답안</Box>
        <Box className="input-container">
          <Box className="location-container">
            <Box className="location-title">지역1</Box>
            <InputCloudiness data={L1} setData={setL1} />
            <InputWindDiriction data={L1} setData={setL1} />
            <InputWindSpeed data={L1} setData={setL1} />
            <InputTemperature data={L1} setData={setL1} />
            <InputPrecipitation data={L1} setData={setL1} />
          </Box>
          <Box className="location-container">
            <Box className="location-title">지역2</Box>
            <InputCloudiness data={L2} setData={setL2} />
            <InputWindDiriction data={L2} setData={setL2} />
            <InputWindSpeed data={L2} setData={setL2} />
            <InputTemperature data={L2} setData={setL2} />
            <InputPrecipitation data={L2} setData={setL2} />
          </Box>
        </Box>
      </Box>

      <Box className="container">
        <Box className="title">근거개수 및 채점하기</Box>
        <Slider
          aria-label="Evidence"
          defaultValue={10}
          value={evid}
          onChange={onEvidChange}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={10}
        />
        <ButtonGroup fullWidth disableElevation variant="outlined" size="small">
          <Button variant="outlined" color="error">
            Reset
          </Button>
          <Button variant="outlined" color="primary" onClick={onScore}>
            Score
          </Button>
        </ButtonGroup>
      </Box>

      <Box className="container">
        <Box className="title">채점결과</Box>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell component="th" align="center" colSpan={5}>
                  지역1
                </TableCell>
                <TableCell component="th" align="center" colSpan={5}>
                  지역2
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">운량</TableCell>
                <TableCell align="center">풍향</TableCell>
                <TableCell align="center">풍속</TableCell>
                <TableCell align="center">기온</TableCell>
                <TableCell align="center">강수</TableCell>
                <TableCell align="center">운량</TableCell>
                <TableCell align="center">풍향</TableCell>
                <TableCell align="center">풍속</TableCell>
                <TableCell align="center">기온</TableCell>
                <TableCell align="center">강수</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">{result[0]}</TableCell>
                <TableCell align="center">{result[1]}</TableCell>
                <TableCell align="center">{result[2]}</TableCell>
                <TableCell align="center">{result[3]}</TableCell>
                <TableCell align="center">{result[4]}</TableCell>
                <TableCell align="center">{result[5]}</TableCell>
                <TableCell align="center">{result[6]}</TableCell>
                <TableCell align="center">{result[7]}</TableCell>
                <TableCell align="center">{result[8]}</TableCell>
                <TableCell align="center">{result[9]}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan={10}>
                  근거점수
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan={10}>
                  {evid}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan={10}>
                  채점결과
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center" colSpan={10}>
                  {score}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Calculator;

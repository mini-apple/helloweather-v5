import React, { useState } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
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

import InputCloudiness from "components/input/InputCloudiness";
import InputWindDiriction from "components/input/InputWindDirenction";
import InputWindSpeed from "components/input/InputWindSpeed";
import InputTemperature from "components/input/InputTemperature";
import InputPrecipitation from "components/input/InputPrecipitation";

function Calculator() {
  const [finalAns, setFinalAns] = useState([]);
  const [finalinp, setFinalInp] = useState([]);
  const [string, setString] = useState("");
  const [evid, setEvid] = useState(50);
  const [fianlRes, setFianlRes] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [finalScore, setFinalScore] = useState(0);
  const [ansVerify, setAnsVerify] = useState(false);
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

  // 1.0.정답입력
  const onStringChange = (event) => {
    const {
      target: { value },
    } = event;
    setString(value);
  };
  // 1.1.정답을 배열로 변환
  const onConvert = () => {
    const tmp = string.split("/");
    if (tmp.length === 10) {
      setAnsVerify(true);
      setFinalAns(tmp);
    }
    console.log(tmp);
  };

  // 근거개수입력
  const onEvidChange = (event) => {
    const {
      target: { value },
    } = event;
    setEvid(value);
  };

  const onScore = () => {
    setEvid(evid * 5);
    let inp = [
      parseFloat(L1.cloudiness),
      parseFloat(L1.windDirection),
      parseFloat(L1.windSpeed),
      parseFloat(L1.temperature),
      parseFloat(L1.precipitation),
      parseFloat(L2.cloudiness),
      parseFloat(L2.windDirection),
      parseFloat(L2.windSpeed),
      parseFloat(L2.temperature),
      parseFloat(L2.precipitation),
    ];
    let ans = [
      parseFloat(finalAns[0]),
      parseFloat(finalAns[1]),
      parseFloat(finalAns[2]),
      parseFloat(finalAns[3]),
      parseFloat(finalAns[4]),
      parseFloat(finalAns[5]),
      parseFloat(finalAns[6]),
      parseFloat(finalAns[7]),
      parseFloat(finalAns[8]),
      parseFloat(finalAns[9]),
    ];
    let res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let sum = evid;

    // 지역1 운량
    if (inp[0] === ans[0]) {
      sum += 10;
    } else if (inp[0] - ans[0] === 1 || inp[0] - ans[0] === -1) {
      sum += 8;
    } else if (inp[0] - ans[0] === 2 || inp[0] - ans[0] === -2) {
      sum += 6;
    } else if (inp[0] - ans[0] === 3 || inp[0] - ans[0] === -3) {
      sum += 4;
    } else if (inp[0] - ans[0] === 4 || inp[0] - ans[0] === -4) {
      sum += 2;
    } else {
      sum += 0;
    }
    res[0] = sum - evid;

    // 지역1 풍향
    if (inp[1] === ans[1]) sum += 10;
    else if (
      inp[1] - ans[1] === 22.5 ||
      inp[1] - ans[1] === -22.5 ||
      inp[1] - ans[1] === 337.5 ||
      inp[1] - ans[1] === -337.5
    ) {
      sum += 8;
    } else if (
      inp[1] - ans[1] === 45 ||
      inp[1] - ans[1] === -45 ||
      inp[1] - ans[1] === 315 ||
      inp[1] - ans[1] === -315
    ) {
      sum += 6;
    } else if (
      inp[1] - ans[1] === 67.5 ||
      inp[1] - ans[1] === -67.5 ||
      inp[1] - ans[1] === 292.5 ||
      inp[1] - ans[1] === -292.5
    ) {
      sum += 4;
    } else if (
      inp[1] - ans[1] === 90 ||
      inp[1] - ans[1] === -90 ||
      inp[1] - ans[1] === 270 ||
      inp[1] - ans[1] === -270
    ) {
      sum += 2;
    } else {
      sum += 0;
    }
    res[1] = sum - (evid + res[0]);

    // 지역1 풍속
    if (inp[2] === ans[2]) {
      sum += 10;
    } else if (inp[2] - ans[2] === 1 || inp[2] - ans[2] === -1) {
      sum += 7;
    } else if (inp[2] - ans[2] === 2 || inp[2] - ans[2] === -2) {
      sum += 4;
    } else if (inp[2] - ans[2] === 3 || inp[2] - ans[2] === -3) {
      sum += 1;
    } else {
      sum += 0;
    }
    res[2] = sum - (evid + res[0] + res[1]);

    // 지역1 기온
    if (-1 <= inp[3] - ans[3] && inp[3] - ans[3] <= 1) {
      sum += 10;
    } else if (-2 <= inp[3] - ans[3] && inp[3] - ans[3] <= 2) {
      sum += 8;
    } else if (-3 <= inp[3] - ans[3] && inp[3] - ans[3] <= 3) {
      sum += 6;
    } else if (-4 <= inp[3] - ans[3] && inp[3] - ans[3] <= 4) {
      sum += 4;
    } else if (-5 <= inp[3] - ans[3] && inp[3] - ans[3] <= 5) {
      sum += 2;
    } else {
      sum += 0;
    }
    res[3] = sum - (evid + res[0] + res[1] + res[2]);

    // 지역1 강수량
    if (inp[4] === ans[4]) {
      sum += 10;
    } else if (inp[4] - ans[4] === 1 || inp[4] - ans[4] === -1) {
      sum += 7;
    } else if (inp[4] - ans[4] === 2 || inp[4] - ans[4] === -2) {
      sum += 4;
    } else if (inp[4] - ans[4] === 3 || inp[4] - ans[4] === -3) {
      sum += 1;
    } else {
      sum += 0;
    }
    res[4] = sum - (evid + res[0] + res[1] + res[2] + res[3]);

    // 지역2 운량
    if (inp[5] === ans[5]) {
      sum += 10;
    } else if (inp[5] - ans[5] === 1 || inp[5] - ans[5] === -1) {
      sum += 8;
    } else if (inp[5] - ans[5] === 2 || inp[5] - ans[5] === -2) {
      sum += 6;
    } else if (inp[5] - ans[5] === 3 || inp[5] - ans[5] === -3) {
      sum += 4;
    } else if (inp[5] - ans[5] === 4 || inp[5] - ans[5] === -4) {
      sum += 2;
    } else sum += 0;
    res[5] = sum - (evid + res[0] + res[1] + res[2] + res[3] + res[4]);

    // 지역2 풍향
    if (inp[6] === ans[6]) {
      sum += 10;
    } else if (
      inp[6] - ans[6] === 22.5 ||
      inp[6] - ans[6] === -22.5 ||
      inp[6] - ans[6] === 337.5 ||
      inp[6] - ans[6] === -337.5
    ) {
      sum += 8;
    } else if (
      inp[6] - ans[6] === 45 ||
      inp[6] - ans[6] === -45 ||
      inp[6] - ans[6] === 315 ||
      inp[6] - ans[6] === -315
    ) {
      sum += 6;
    } else if (
      inp[6] - ans[6] === 67.5 ||
      inp[6] - ans[6] === -67.5 ||
      inp[6] - ans[6] === 292.5 ||
      inp[6] - ans[6] === -292.5
    ) {
      sum += 4;
    } else if (
      inp[6] - ans[6] === 90 ||
      inp[6] - ans[6] === -90 ||
      inp[6] - ans[6] === 270 ||
      inp[6] - ans[6] === -270
    ) {
      sum += 2;
    } else {
      sum += 0;
    }
    res[6] = sum - (evid + res[0] + res[1] + res[2] + res[3] + res[4] + res[5]);

    // 지역2 풍속
    if (inp[7] === ans[7]) {
      sum += 10;
    } else if (inp[7] - ans[7] === 1 || inp[7] - ans[7] === -1) {
      sum += 7;
    } else if (inp[7] - ans[7] === 2 || inp[7] - ans[7] === -2) {
      sum += 4;
    } else if (inp[7] - ans[7] === 3 || inp[7] - ans[7] === -3) {
      sum += 1;
    } else {
      sum += 0;
    }
    res[7] =
      sum -
      (evid + res[0] + res[1] + res[2] + res[3] + res[4] + res[5] + res[6]);

    // 지역2 기온
    if (-1 <= inp[8] - ans[8] && inp[8] - ans[8] <= 1) {
      sum += 10;
    } else if (-2 <= inp[8] - ans[8] && inp[8] - ans[8] <= 2) {
      sum += 8;
    } else if (-3 <= inp[8] - ans[8] && inp[8] - ans[8] <= 3) {
      sum += 6;
    } else if (-4 <= inp[8] - ans[8] && inp[8] - ans[8] <= 4) {
      sum += 4;
    } else if (-5 <= inp[8] - ans[8] && inp[8] - ans[8] <= 5) {
      sum += 2;
    } else sum += 0;
    res[8] =
      sum -
      (evid +
        res[0] +
        res[1] +
        res[2] +
        res[3] +
        res[4] +
        res[5] +
        res[6] +
        res[7]);

    // 지역2 강수량
    if (inp[9] === ans[9]) {
      sum += 10;
    } else if (inp[9] - ans[9] === 1 || inp[9] - ans[9] === -1) {
      sum += 7;
    } else if (inp[9] - ans[9] === 2 || inp[9] - ans[9] === -2) {
      sum += 4;
    } else if (inp[9] - ans[9] === 3 || inp[9] - ans[9] === -3) {
      sum += 1;
    } else {
      sum += 0;
    }
    res[9] =
      sum -
      (evid +
        res[0] +
        res[1] +
        res[2] +
        res[3] +
        res[4] +
        res[5] +
        res[6] +
        res[7] +
        res[8]);

    console.log(inp, ans, res, sum);
    setFinalInp(inp);
    setFinalAns(ans);
    setFianlRes(res);
    setFinalScore(sum);
  };

  return (
    <Box>
      <Box className="box">
        <TextField
          id="outlined-basic"
          label="정답코드"
          variant="outlined"
          value={string}
          onChange={onStringChange}
          size="small"
        />
        <Button variant="outlined" onClick={onConvert}>
          정답입력
        </Button>
        {ansVerify ? <div>정답입력확인!</div> : <div>정답미입력</div>}
        <div>0/0/0/0/0/1/22.5/1/1/1</div>
      </Box>
      <Box className="box ">
        <div>나의 답안 </div>
        <Divider />
        <Box className="flex-container">
          <Box className="box flex-item">
            <div>지역1</div>
            <InputCloudiness data={L1} setData={setL1} />
            <InputWindDiriction data={L1} setData={setL1} />
            <InputWindSpeed data={L1} setData={setL1} />
            <InputTemperature data={L1} setData={setL1} />
            <InputPrecipitation data={L1} setData={setL1} />
          </Box>
          <Box className="box flex-item">
            <div>지역2</div>
            <InputCloudiness data={L2} setData={setL2} />
            <InputWindDiriction data={L2} setData={setL2} />
            <InputWindSpeed data={L2} setData={setL2} />
            <InputTemperature data={L2} setData={setL2} />
            <InputPrecipitation data={L2} setData={setL2} />
          </Box>
        </Box>
      </Box>
      <Box className="box">
        <div>근거개수 및 채점</div>
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
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button variant="outlined">Reset</Button>
          <Button variant="outlined" onClick={onScore}>
            Score
          </Button>
        </ButtonGroup>
      </Box>

      <div>
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
                <TableCell align="center">{fianlRes[0]}</TableCell>
                <TableCell align="center">{fianlRes[1]}</TableCell>
                <TableCell align="center">{fianlRes[2]}</TableCell>
                <TableCell align="center">{fianlRes[3]}</TableCell>
                <TableCell align="center">{fianlRes[4]}</TableCell>
                <TableCell align="center">{fianlRes[5]}</TableCell>
                <TableCell align="center">{fianlRes[6]}</TableCell>
                <TableCell align="center">{fianlRes[7]}</TableCell>
                <TableCell align="center">{fianlRes[8]}</TableCell>
                <TableCell align="center">{fianlRes[9]}</TableCell>
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
                  {finalScore}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
}

export default Calculator;

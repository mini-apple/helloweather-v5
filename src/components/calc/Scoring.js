import React, { useState } from "react";

function Scoring() {
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
    sum - (evid + res[0] + res[1] + res[2] + res[3] + res[4] + res[5] + res[6]);

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
}

export default Scoring;

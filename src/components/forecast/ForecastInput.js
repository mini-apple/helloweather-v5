import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { auth, db, storage } from "fbase";
import {
  collection,
  setDoc,
  query,
  where,
  getDocs,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import UserAnswerCard from "./UserAnswerCard";
import InputCloudiness from "components/input/InputCloudiness";
import InputWindDiriction from "components/input/InputWindDirenction";
import InputWindSpeed from "components/input/InputWindSpeed";
import InputTemperature from "components/input/InputTemperature";
import InputPrecipitation from "components/input/InputPrecipitation";
import Slider from "@mui/material/Slider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 10,
    label: "10",
  },
];

const ForecastInput = ({ userObj, setShowInput, gameObj }) => {
  const [forecastObj, setForecastObj] = useState("");
  const [isLeader, setIsLeader] = useState(false);
  const [forecastStatus, setForecastStatue] = useState(gameObj.forecastStatus);
  const [answerList, setAnswerList] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [participantsList, setParticipantsList] = useState([]);

  const onGetData = async () => {
    const docRef = doc(db, "forecast-2023-1", `${gameObj.forecastDate}`);
    const docSnap = await getDoc(docRef);
    setForecastObj(docSnap.data());

    const UIDList = gameObj.userList;
    console.log("UIDList", UIDList);

    const tmpParticipantsList = [];
    for (let i = 0; i < UIDList.length; i++) {
      const j = UIDList[i];
      const tmp = gameObj.userAnswerObj[j];
      tmpParticipantsList.push(tmp);
    }
    console.log("참여자객체", tmpParticipantsList);
    setParticipantsList(tmpParticipantsList);

    console.log("onGetData");
  };

  const [evid, setEvid] = useState(10);

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

  // 근거개수입력
  const onEvidChange = (event) => {
    const {
      target: { value },
    } = event;
    setEvid(value);
  };

  const onSubmit = async () => {
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
      alert("입력되지 않은 항목이 있습니다.\n모든 항목을 입력해주세요!");
      return;
    }
    const plainText = `${L1.cloudiness}/${L1.windDirection}/${L1.windSpeed}/${L1.temperature}/${L1.precipitation}/${L2.cloudiness}/${L2.windDirection}/${L2.windSpeed}/${L2.temperature}/${L2.precipitation}`;
    const newForecastObj = forecastObj;
    const uid = userObj.uid;
    newForecastObj.userAnswerObj[uid] = {
      userName: userObj.displayName,
      userUID: userObj.uid,
      userAnswer: plainText,
      userEvid: evid * 5,
    };
    console.log(newForecastObj);

    // firestore에 newforecastObj를 저장
    try {
      const docRef = await setDoc(
        doc(db, `forecast-2023-1`, `${forecastObj.forecastDate}`),
        newForecastObj
      );
      alert("정답을 제출했습니다!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("정답 제출 실패!");
    }
  };

  const onSetUsers = async () => {
    //uid로 이름찾기
    const UIDList = Object.keys(forecastObj.userAnswerObj);
    const nameList = [];
    try {
      const q = query(collection(db, "users"), where("uid", "in", UIDList));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().name);
        nameList.push(doc.data().name);
      });
      console.log(nameList);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    // 이름확인하기
    const ok = window.confirm(
      `참여자를 확인후 확정해주세요! \n정답을 제출한 사람: ${nameList}`
    );
    if (ok) {
      const newForecastObj = forecastObj;
      newForecastObj.userList = UIDList;
      // firestore에 newforecastObj를 저장
      try {
        const docRef = await setDoc(
          doc(db, `forecast-2023-1`, `${newForecastObj.forecastDate}`),
          newForecastObj
        );
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const onCalculate = async () => {
    const userList = forecastObj.userList;
    const ansList = forecastObj.leaderAnswer.split("/");
    const ans = [
      parseFloat(ansList[0]),
      parseFloat(ansList[1]),
      parseFloat(ansList[2]),
      parseFloat(ansList[3]),
      parseFloat(ansList[4]),
      parseFloat(ansList[5]),
      parseFloat(ansList[6]),
      parseFloat(ansList[7]),
      parseFloat(ansList[8]),
      parseFloat(ansList[9]),
    ];
    for (let i = 0; i < userList.length; i++) {
      const uid = userList[i];
      const inpList = forecastObj.userAnswerObj[uid].userAnswer.split("/");
      const inp = [
        parseFloat(inpList[0]),
        parseFloat(inpList[1]),
        parseFloat(inpList[2]),
        parseFloat(inpList[3]),
        parseFloat(inpList[4]),
        parseFloat(inpList[5]),
        parseFloat(inpList[6]),
        parseFloat(inpList[7]),
        parseFloat(inpList[8]),
        parseFloat(inpList[9]),
      ];
      console.log(inp);

      const diff = [
        inp[0] - ans[0],
        inp[1] - ans[1],
        inp[2] - ans[2],
        inp[3] - ans[3],
        inp[4] - ans[4],
        inp[5] - ans[5],
        inp[6] - ans[6],
        inp[7] - ans[7],
        inp[8] - ans[8],
        inp[9] - ans[9],
      ];
      const res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      // 지역1 운량
      if (diff[0] === 0) {
        res[0] = 10;
      } else if (diff[0] === 1 || diff[0] === -1) {
        res[0] = 8;
      } else if (diff[0] === 2 || diff[0] === -2) {
        res[0] = 6;
      } else if (diff[0] === 3 || diff[0] === -3) {
        res[0] = 4;
      } else if (diff[0] === 4 || diff[0] === -4) {
        res[0] = 2;
      } else {
        res[0] = 0;
      }

      // 지역1 풍향
      if (diff[1] === 0) {
        res[1] = 10;
      } else if (
        diff[1] === 22.5 ||
        diff[1] === -22.5 ||
        diff[1] === 337.5 ||
        diff[1] === -337.5
      ) {
        res[1] = 8;
      } else if (
        diff[1] === 45 ||
        diff[1] === -45 ||
        diff[1] === 315 ||
        diff[1] === -315
      ) {
        res[1] = 6;
      } else if (
        diff[1] === 67.5 ||
        diff[1] === -67.5 ||
        diff[1] === 292.5 ||
        diff[1] === -292.5
      ) {
        res[1] = 4;
      } else if (
        diff[1] === 90 ||
        diff[1] === -90 ||
        diff[1] === 270 ||
        diff[1] === -270
      ) {
        res[1] = 2;
      } else {
        res[1] = 0;
      }

      // 지역1 풍속
      if (diff[2] === 0) {
        res[2] = 10;
      } else if (diff[2] === 1 || diff[2] === -1) {
        res[2] = 7;
      } else if (diff[2] === 2 || diff[2] === -2) {
        res[2] = 4;
      } else if (diff[2] === 3 || diff[2] === -3) {
        res[2] = 1;
      } else {
        res[2] = 0;
      }

      // 지역1 기온
      if (-1 <= diff[3] && diff[3] <= 1) {
        res[3] = 10;
      } else if (-2 <= diff[3] && diff[3] <= 2) {
        res[3] = 8;
      } else if (-3 <= diff[3] && diff[3] <= 3) {
        res[3] = 6;
      } else if (-4 <= diff[3] && diff[3] <= 4) {
        res[3] = 4;
      } else if (-5 <= diff[3] && diff[3] <= 5) {
        res[3] = 2;
      } else {
        res[3] = 0;
      }

      // 지역1 강수량
      if (diff[4] === 0) {
        res[4] = 10;
      } else if (diff[4] === 1 || diff[4] === -1) {
        res[4] = 7;
      } else if (diff[4] === 2 || diff[4] === -2) {
        res[4] = 4;
      } else if (diff[4] === 3 || diff[4] === -3) {
        res[4] = 1;
      } else {
        res[4] = 0;
      }

      // 지역2 운량
      if (diff[5] === 0) {
        res[5] = 10;
      } else if (diff[5] === 1 || diff[5] === -1) {
        res[5] = 8;
      } else if (diff[5] === 2 || diff[5] === -2) {
        res[5] = 6;
      } else if (diff[5] === 3 || diff[5] === -3) {
        res[5] = 4;
      } else if (diff[5] === 4 || diff[5] === -4) {
        res[5] = 2;
      } else {
        res[5] = 0;
      }

      // 지역2 풍향
      if (diff[6] === 0) {
        res[6] = 10;
      } else if (
        diff[6] === 22.5 ||
        diff[6] === -22.5 ||
        diff[6] === 337.5 ||
        diff[6] === -337.5
      ) {
        res[6] = 8;
      } else if (
        diff[6] === 45 ||
        diff[6] === -45 ||
        diff[6] === 315 ||
        diff[6] === -315
      ) {
        res[6] = 6;
      } else if (
        diff[6] === 67.5 ||
        diff[6] === -67.5 ||
        diff[6] === 292.5 ||
        diff[6] === -292.5
      ) {
        res[6] = 4;
      } else if (
        diff[6] === 90 ||
        diff[6] === -90 ||
        diff[6] === 270 ||
        diff[6] === -270
      ) {
        res[6] = 2;
      } else {
        res[6] = 0;
      }

      // 지역2 풍속
      if (diff[7] === 0) {
        res[7] = 10;
      } else if (diff[7] === 1 || diff[7] === -1) {
        res[7] = 7;
      } else if (diff[7] === 2 || diff[7] === -2) {
        res[7] = 4;
      } else if (diff[7] === 3 || diff[7] === -3) {
        res[7] = 1;
      } else {
        res[7] = 0;
      }

      // 지역2 기온
      if (-1 <= diff[8] && diff[8] <= 1) {
        res[8] = 10;
      } else if (-2 <= diff[8] && diff[8] <= 2) {
        res[8] = 8;
      } else if (-3 <= diff[8] && diff[8] <= 3) {
        res[8] = 6;
      } else if (-4 <= diff[8] && diff[8] <= 4) {
        res[8] = 4;
      } else if (-5 <= diff[8] && diff[8] <= 5) {
        res[8] = 2;
      } else {
        res[8] = 0;
      }

      // 지역2 강수량
      if (diff[9] === 0) {
        res[9] = 10;
      } else if (diff[9] === 1 || diff[9] === -1) {
        res[9] = 7;
      } else if (diff[9] === 2 || diff[9] === -2) {
        res[9] = 4;
      } else if (diff[9] === 3 || diff[9] === -3) {
        res[9] = 1;
      } else {
        res[9] = 0;
      }

      // 계산
      const evidScore = forecastObj.userAnswerObj[uid].userEvid;
      let sum = 0;
      for (let i = 0; i < 10; i++) {
        sum = sum + res[i];
      }
      sum = sum + evidScore;
      console.log("diff", diff, "res", res, "score", sum);

      const newForecastObj = forecastObj;
      newForecastObj.forecastStatus = false;
      newForecastObj.userAnswerObj[uid] = {
        ...forecastObj.userAnswerObj[uid],
        userDifference: diff,
        userResult: res,
        userScore: sum,
      };

      // firestore에 newforecastObj를 저장
      try {
        const docRef = await setDoc(
          doc(db, `forecast-2023-1`, `${forecastObj.forecastDate}`),
          newForecastObj
        );
        alert("채점이 완료되었습니다!");
      } catch (e) {
        console.error("Error adding document: ", e);
        alert("채점에 실패했습니다!");
      }
    }
    setShowInput(false);
  };

  const onAnswerConvert = () => {
    let inpList = gameObj.leaderAnswer.split("/");
    let newList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // 3.정답 표시해주기
    // 3-1. L1 운량
    newList[0] = inpList[0];
    // 3-2. 풍향
    if (inpList[1] === "0") {
      newList[1] = "N";
    } else if (inpList[1] === "22.5") {
      newList[1] = "NNE";
    } else if (inpList[1] === "45") {
      newList[1] = "NE";
    } else if (inpList[1] === "67.5") {
      newList[1] = "ENE";
    } else if (inpList[1] === "90") {
      newList[1] = "E";
    } else if (inpList[1] === "112.5") {
      newList[1] = "ESE";
    } else if (inpList[1] === "135") {
      newList[1] = "SE";
    } else if (inpList[1] === "157.5") {
      newList[1] = "SSE";
    } else if (inpList[1] === "180") {
      newList[1] = "S";
    } else if (inpList[1] === "202.5") {
      newList[1] = "SSW";
    } else if (inpList[1] === "225") {
      newList[1] = "SW";
    } else if (inpList[1] === "247.5") {
      newList[1] = "WSW";
    } else if (inpList[1] === "270") {
      newList[1] = "W";
    } else if (inpList[1] === "292.5") {
      newList[1] = "WNW";
    } else if (inpList[1] === "315") {
      newList[1] = "NW";
    } else if (inpList[1] === "337.5") {
      newList[1] = "NNW";
    }
    // 3-3.풍속
    if (inpList[2] === "0") {
      newList[2] = "0 m/s ≤ ~ < 0.5 m/s";
    } else if (inpList[2] === "1") {
      newList[2] = "0.5 m/s ≤ ~ < 5 m/s";
    } else if (inpList[2] === "2") {
      newList[2] = "5 m/s ≤ ~ < 10 m/s";
    } else if (inpList[2] === "3") {
      newList[2] = "10 m/s ≤ ~ < 15 m/s";
    } else if (inpList[2] === "4") {
      newList[2] = "15 m/s ≤ ~ < 20 m/s";
    } else if (inpList[2] === "5") {
      newList[2] = "20 m/s 이상";
    }
    // 3-4.기온
    newList[3] = inpList[3];
    // 3-5. 강수량
    if (inpList[4] === "0") {
      newList[4] = "X";
    } else if (inpList[4] === "1") {
      newList[4] = "0.0 mm ≤ ~ < 5 mm";
    } else if (inpList[4] === "2") {
      newList[4] = "5 mm ≤ ~ < 10 mm";
    } else if (inpList[4] === "3") {
      newList[4] = "10 mm ≤ ~ < 20 mm";
    } else if (inpList[4] === "4") {
      newList[4] = "20 mm ≤ ~ < 30 mm";
    } else if (inpList[4] === "5") {
      newList[4] = "30 mm ≤ ~ < 50 mm";
    } else if (inpList[4] === "6") {
      newList[4] = "50 mm ≤ ~ < 80 mm";
    } else if (inpList[4] === "7") {
      newList[4] = "80 mm ≤ ~ < 120 mm";
    } else if (inpList[4] === "8") {
      newList[4] = "120 mm 이상";
    }
    // 3-1. L1 운량
    newList[5] = inpList[5];
    // 3-2. 풍향
    if (inpList[6] === "0") {
      newList[6] = "N";
    } else if (inpList[6] === "22.5") {
      newList[6] = "NNE";
    } else if (inpList[6] === "45") {
      newList[6] = "NE";
    } else if (inpList[6] === "67.5") {
      newList[6] = "ENE";
    } else if (inpList[6] === "90") {
      newList[6] = "E";
    } else if (inpList[6] === "112.5") {
      newList[6] = "ESE";
    } else if (inpList[6] === "135") {
      newList[6] = "SE";
    } else if (inpList[6] === "157.5") {
      newList[6] = "SSE";
    } else if (inpList[6] === "180") {
      newList[6] = "S";
    } else if (inpList[6] === "202.5") {
      newList[6] = "SSW";
    } else if (inpList[6] === "225") {
      newList[6] = "SW";
    } else if (inpList[6] === "247.5") {
      newList[6] = "WSW";
    } else if (inpList[6] === "270") {
      newList[6] = "W";
    } else if (inpList[6] === "292.5") {
      newList[6] = "WNW";
    } else if (inpList[6] === "315") {
      newList[6] = "NW";
    } else if (inpList[6] === "337.5") {
      newList[6] = "NNW";
    }
    // 3-3.풍속
    if (inpList[7] === "0") {
      newList[7] = "0 m/s ≤ ~ < 0.5 m/s";
    } else if (inpList[7] === "1") {
      newList[7] = "0.5 m/s ≤ ~ < 5 m/s";
    } else if (inpList[7] === "2") {
      newList[7] = "5 m/s ≤ ~ < 10 m/s";
    } else if (inpList[7] === "3") {
      newList[7] = "10 m/s ≤ ~ < 15 m/s";
    } else if (inpList[7] === "4") {
      newList[7] = "15 m/s ≤ ~ < 20 m/s";
    } else if (inpList[7] === "5") {
      newList[7] = "20 m/s 이상";
    }
    // 3-4.기온
    newList[8] = inpList[8];
    // 3-5. 강수량
    if (inpList[9] === "0") {
      newList[9] = "X";
    } else if (inpList[9] === "1") {
      newList[9] = "0.0 mm ≤ ~ < 5 mm";
    } else if (inpList[9] === "2") {
      newList[9] = "5 mm ≤ ~ < 10 mm";
    } else if (inpList[9] === "3") {
      newList[9] = "10 mm ≤ ~ < 20 mm";
    } else if (inpList[9] === "4") {
      newList[9] = "20 mm ≤ ~ < 30 mm";
    } else if (inpList[9] === "5") {
      newList[9] = "30 mm ≤ ~ < 50 mm";
    } else if (inpList[9] === "6") {
      newList[9] = "50 mm ≤ ~ < 80 mm";
    } else if (inpList[9] === "7") {
      newList[9] = "80 mm ≤ ~ < 120 mm";
    } else if (inpList[9] === "8") {
      newList[9] = "120 mm 이상";
    }
    setAnswerList(newList);
  };

  useEffect(() => {
    console.log("input useEffect");
    onGetData();
    if (gameObj.leaderUID === userObj.uid) {
      setIsLeader(true);
    }
    try {
      onAnswerConvert();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log(gameObj);
  }, []);

  return (
    <>
      {forecastStatus ? (
        <>
          <Box className="container">
            <Box className="title">예보정보</Box>
            <Box>일시: {forecastObj.forecastDate}</Box>
            <Box>출제자: {forecastObj.leaderName}</Box>
            <Box>참여자: {userObj.displayName}</Box>
            <Box>반드시 참여자 확정하기를 한 후 채점하기를 눌러주세요!</Box>
            <Box>
              <Button
                variant="outlined"
                color="success"
                size="small"
                onClick={() => setShowInput(false)}
              >
                돌아가기
              </Button>
              {isLeader ? (
                <>
                  <Button variant="outlined" size="small" onClick={onSetUsers}>
                    참여자 확정하기
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={onCalculate}
                  >
                    채점하기
                  </Button>
                </>
              ) : (
                <Box></Box>
              )}
            </Box>
          </Box>

          <Box className="container">
            <Box className="title">나의 답안</Box>
            <Box className="input-container">
              <Box className="location-container">
                <Box className="location-title">지역1</Box>
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
                <Box className="location-title">지역2</Box>
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
          </Box>
          <Box className="container">
            <Box className="title">근거개수 및 정답제출하기</Box>
            <Box className="evid-container">
              <Box>근거개수 : {evid}개</Box>
              <Slider
                defaultValue={10}
                value={evid}
                onChange={onEvidChange}
                valueLabelDisplay="auto"
                step={1}
                marks={marks}
                min={0}
                max={10}
              />
            </Box>

            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={onSubmit}
            >
              제출하기
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box className="container">
            <Box className="title">예보정보</Box>
            <Box>일시: {forecastObj.forecastDate}</Box>
            <Box>인도자: {forecastObj.leaderName}</Box>
            <Box>정답표</Box>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell component="th" align="center">
                      지역1
                    </TableCell>
                    <TableCell component="th" align="center">
                      지역2
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">운량</TableCell>
                    <TableCell align="center">{answerList[0]}</TableCell>
                    <TableCell align="center">{answerList[5]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">풍향</TableCell>
                    <TableCell align="center">{answerList[1]}</TableCell>
                    <TableCell align="center">{answerList[6]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">풍속</TableCell>
                    <TableCell align="center">{answerList[2]}</TableCell>
                    <TableCell align="center">{answerList[7]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">기온</TableCell>
                    <TableCell align="center">{answerList[3]}</TableCell>
                    <TableCell align="center">{answerList[8]}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">강수량</TableCell>
                    <TableCell align="center">{answerList[4]}</TableCell>
                    <TableCell align="center">{answerList[9]}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={() => setShowInput(false)}
            >
              돌아가기
            </Button>
          </Box>
          <Box className="container">
            <Box className="title">예보결과</Box>
            {participantsList.map((userAttrObj) => (
              <UserAnswerCard
                key={userAttrObj.userUID}
                userAttrObj={userAttrObj}
              />
            ))}
          </Box>
        </>
      )}
    </>
  );
};

export default ForecastInput;

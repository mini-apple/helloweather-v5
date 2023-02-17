import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputCloudiness from "components/input/InputCloudiness";
import InputWindDiriction from "components/input/InputWindDirenction";
import InputWindSpeed from "components/input/InputWindSpeed";
import InputTemperature from "components/input/InputTemperature";
import InputPrecipitation from "components/input/InputPrecipitation";
import ForecastCard from "./ForecastCard";
import ForecastInput from "./ForecastInput";

import { auth, db, storage } from "fbase";
import {
  collection,
  setDoc,
  query,
  where,
  getDocs,
  doc,
  onSnapshot,
} from "firebase/firestore";

const Forecasting = ({ userObj }) => {
  const DateObj = new Date();
  const currentYear = DateObj.getFullYear();
  const currentMonth = DateObj.getMonth() + 1;
  const currentSemester = 1;
  const years = [];
  if (currentMonth <= 6) {
    years.push(currentYear + "-1학기");
  } else if (7 <= currentMonth && currentMonth <= 12) {
    currentSemester = 2;
    years.push(currentYear + "-2학기");
    years.push(currentYear + "-1학기");
  }
  for (let i = currentYear - 1; i >= 2009; i--) {
    for (let j = 2; j >= 1; j--) {
      years.push(i + "-" + j + "학기");
    }
  }
  const [selectYear, setSelectYear] = useState(years[0]);
  const [titleYear, setTitleYear] = useState(years[0]);
  const [makeRoom, setMakeRoom] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [gameObj, setGameObj] = useState("");

  const handleChange = async (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "select-year") {
      setSelectYear(value);
    } else if (name === "due-date") {
      setDueDate(value);
    }
  };

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

  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    onGetGame();
  }, []);

  const onSubmit = async () => {
    if (dueDate === "") {
      alert("예보게임 예정일을 입력해주세요!");
      return;
    } else if (
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

    const newForecastObj = {
      forecastDate: dueDate,
      forecastStatus: true,
      leaderName: userObj.displayName,
      leaderUID: userObj.uid,
      leaderAnswer: plainText,
      userList: [],
      userAnswerObj: {},
    };

    console.log(newForecastObj);
    const selectSemester = selectYear.slice(0, 6);
    // firestore에 newforecastObj를 저장
    try {
      const docRef = await setDoc(
        doc(db, `forecast-${selectSemester}`, `${newForecastObj.forecastDate}`),
        newForecastObj
      );
      alert("등록이 완료되었습니다!");
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("등록에 실패 했습니다!");
    }
  };

  const onGetGame = async () => {
    const list = [];
    console.log("selectYear", selectYear.slice(0, 6));
    const selectSemester = selectYear.slice(0, 6);
    const selectYearRef = collection(db, `forecast-${selectSemester}`);

    const querySnapshot = await getDocs(selectYearRef);

    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    console.log(list);
    setGameList(list);
    setTitleYear(selectYear);
  };

  return (
    <>
      {showInput ? (
        <ForecastInput
          userObj={userObj}
          setShowInput={setShowInput}
          gameObj={gameObj}
        />
      ) : (
        <>
          <Box className="container">
            <Box className="title">학기선택</Box>
            <Box className="year-container">
              <Box className="year-select">
                <FormControl fullWidth size="small">
                  <InputLabel id="select-year">활동학기</InputLabel>
                  <Select
                    labelId="select-year"
                    name="select-year"
                    value={selectYear}
                    label="활동학기"
                    onChange={handleChange}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Button variant="outlined" size="small" onClick={onGetGame}>
                불러오기
              </Button>
            </Box>
          </Box>
          <Box className="container">
            <Box className="title">{titleYear}</Box>
            <Box>
              {gameList.map((gameAttrObj) => (
                <ForecastCard
                  key={gameAttrObj.forecastDate}
                  gameAttrObj={gameAttrObj}
                  setShowInput={setShowInput}
                  setGameObj={setGameObj}
                />
              ))}
            </Box>
            <Box>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  setMakeRoom(!makeRoom);
                }}
              >
                추가하기
              </Button>
            </Box>
          </Box>
          {makeRoom ? (
            <Box className="container">
              <Box className="title">예보게임 등록</Box>
              <Box className="forecast-info-container">
                <Box>인도자: {userObj.displayName}</Box>
                <Box className="dueDate-container">
                  <Box>예보게임 예정일시: </Box>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="date"
                    value={dueDate}
                    name="due-date"
                    onChange={handleChange}
                  />
                </Box>
              </Box>
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
              <Box>
                <Button variant="outlined" size="small" onClick={onSubmit}>
                  등록하기
                </Button>
              </Box>
            </Box>
          ) : (
            <Box></Box>
          )}
        </>
      )}
    </>
  );
};

export default Forecasting;

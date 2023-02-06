import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { db } from "fbase";
import { collection, query, where, getDocs } from "firebase/firestore";
import MemberCard from "./MemberCard";

const MemberStatus = () => {
  const currentYear = new Date().getFullYear();

  const years = [];
  for (let i = currentYear; i >= 2009; i--) {
    for (let j = 2; j >= 1; j--) {
      years.push(i + "-" + j + "학기");
    }
  }

  const [activeYear, setActiveYear] = useState(years[0]);
  const [titleYear, setTitleYear] = useState(years[0]);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    onGetMember();
  }, []);

  const handleChange = async (event) => {
    const {
      target: { value },
    } = event;
    setActiveYear(value);
  };

  const onGetMember = async () => {
    const list = [];
    const activeYearRef = collection(db, "users");
    const q = query(
      activeYearRef,
      where("userActiveYear", "array-contains", activeYear)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      list.push(doc.data());
    });
    setMemberList(list);
    setTitleYear(activeYear);
  };

  return (
    <>
      <Box className="container">
        <Box className="title">멤버현황</Box>
        <Box className="member-year-container">
          <Box className="member-year-select">
            <FormControl fullWidth size="small">
              <InputLabel id="active-year">활동학기</InputLabel>
              <Select
                labelId="active-year"
                value={activeYear}
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
          <Button variant="outlined" onClick={onGetMember} size="small">
            불러오기
          </Button>
        </Box>
      </Box>
      <Box className="container">
        <Box className="title">{titleYear}</Box>
        <Box className="member-card-container">
          {memberList.map((userAttrObj) => (
            <MemberCard key={userAttrObj} userAttrObj={userAttrObj} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default MemberStatus;

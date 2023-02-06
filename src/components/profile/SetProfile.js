import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { auth, db, storage } from "fbase";
import {
  collection,
  setDoc,
  query,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const SetProfile = ({ userObj }) => {
  const currentYear = new Date().getFullYear();

  const [name, setName] = useState("");
  const [spaceName, setSpaceName] = useState("");
  const [entranceUniv, setEntranceUniv] = useState(currentYear);
  const [activeYear, setActiveYear] = useState([]);
  const [attachment, setAttachment] = useState("");

  let navigate = useNavigate();

  console.log("userObj: ", userObj);
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      setName(value);
    } else if (name === "spaceName") {
      setSpaceName(value);
    } else if (name === "entranceUniv") {
      setEntranceUniv(value);
    } else if (name === "activeYear") {
      setActiveYear(typeof value === "string" ? value.split(",") : value);
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const years = [];

  for (let i = currentYear; i >= 2009; i--) {
    for (let j = 2; j >= 1; j--) {
      years.push(i + "-" + j + "학기");
    }
  }

  const onSaveProfile = async () => {
    let attachmentUrl = "";

    // storage에 업로드
    if (attachment !== "") {
      // 파일 참조경로 만들기
      const attachmentRef = ref(storage, `${userObj.uid}`);
      // storage 참조경로로  파일 업로드하기
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      console.log("response.ref", response.ref);
      console.log("attachmentRef", attachmentRef);
      // storage 참조경로에 있는 파일 url을 다운로드 해서 attachmentUrl 변수 업데이트
      attachmentUrl = await getDownloadURL(response.ref);

      await updateProfile(auth.currentUser, {
        photoURL: attachmentUrl,
      });
    }

    const profileObj = {
      userName: name,
      userSpaceName: spaceName,
      userEntranveUniv: entranceUniv,
      userActiveYear: activeYear,
      userUID: userObj.uid,
      attachmentUrl,
    };

    const userRef = collection(db, "users");
    const q = query(userRef, where("userUID", "==", userObj.uid));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.empty);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });

    try {
      const docRef = await setDoc(
        doc(db, "users", `${userObj.uid}`),
        profileObj
      );
      if (userObj.displayName !== profileObj.userName) {
        await updateProfile(auth.currentUser, {
          displayName: profileObj.userName,
        });
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    console.log(userObj);
  };

  const onLogOutClick = () => {
    signOut(auth);
    navigate("/");
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      // 이건 이미지를 문자열로 바꾼거임
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment("");

  return (
    <>
      <Box className="container">
        <Box className="title">프로필 편집</Box>
        <Box>
          <Box>
            <input type="file" accept="image/*" onChange={onFileChange} />
            {attachment && (
              <div>
                <img src={attachment} width="50px" height="50px" />
                <button onClick={onClearAttachment}>Clear</button>
              </div>
            )}
          </Box>
          <Box>
            <TextField
              name="name"
              label="이름"
              variant="outlined"
              size="small"
              value={name}
              onChange={onChange}
            />
          </Box>
          <Box>
            <TextField
              name="spaceName"
              label="스페이스네임"
              variant="outlined"
              size="small"
              value={spaceName}
              onChange={onChange}
            />
          </Box>
          <Box>
            <TextField
              name="entranceUniv"
              label="학번"
              variant="outlined"
              size="small"
              value={entranceUniv}
              onChange={onChange}
            />
          </Box>
          <Box>
            <FormControl sx={{ m: 1, width: 300 }} size="small">
              <InputLabel id="demo-multiple-checkbox-label">
                활동학기
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                name="activeYear"
                value={activeYear}
                onChange={onChange}
                input={<OutlinedInput label="활동학기" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    <Checkbox checked={activeYear.indexOf(year) > -1} />
                    <ListItemText primary={year} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Button variant="outlined" onClick={onSaveProfile}>
              프로필 편집
            </Button>
          </Box>
          <Box>
            <Button variant="outlined" onClick={onLogOutClick}>
              로그아웃
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SetProfile;

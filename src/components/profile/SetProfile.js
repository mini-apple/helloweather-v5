import React, { useEffect, useState } from "react";
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
import Avatar from "@mui/material/Avatar";
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
import { useNavigate } from "react-router-dom";
import { signOut, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const SetProfile = ({ userObj }) => {
  let navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const [editProfile, setEditProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    spaceName: "",
    entranceUniv: "",
    activeYear: [],
    attachment: "",
    uid: userObj.uid,
  });

  const years = [];
  for (let i = currentYear; i >= 2009; i--) {
    for (let j = 2; j >= 1; j--) {
      years.push(i + "-" + j + "학기");
    }
  }

  const settingUserData = async () => {
    const userRef = collection(db, "users");
    // Create a query against the collection.
    const q = query(userRef, where("uid", "==", userObj.uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      onSnapshot(doc(db, "users", profile.uid), (doc) => {
        console.log(doc.data());
        setProfile(doc.data());
      });
    }
  };

  // 현재정보 불러오기
  useEffect(() => {
    settingUserData();
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      setProfile({ ...profile, name: value });
    } else if (name === "spaceName") {
      setProfile({ ...profile, spaceName: value });
    } else if (name === "entranceUniv") {
      setProfile({ ...profile, entranceUniv: value });
    } else if (name === "activeYear") {
      setProfile({
        ...profile,
        activeYear: typeof value === "string" ? value.split(",") : value,
      });
    }
    console.log(profile);
  };

  // 실제 저장
  const onSaveProfile = async () => {
    let attachmentUrl = "";
    const attachment = profile.attachment;

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

    const newProfileObj = {
      name: profile.name,
      spaceName: profile.spaceName,
      entranceUniv: profile.entranceUniv,
      activeYear: profile.activeYear,
      uid: profile.uid,
      attachmentUrl,
    };

    // firestore에 newProfileObj를 저장
    try {
      const docRef = await setDoc(
        doc(db, "users", `${userObj.uid}`),
        newProfileObj
      );

      if (userObj.displayName !== newProfileObj.userName) {
        // displayName 업데이트
        await updateProfile(auth.currentUser, {
          displayName: newProfileObj.userName,
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
      setProfile({ ...profile, attachment: result });
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <>
      <Box className="container">
        <Box className="title">현재 프로필</Box>
        <Box className="profile-container">
          <Avatar
            src={profile.attachmentUrl}
            sx={{ width: 130, height: 130 }}
          />
          <Box className="profile-info">
            <Box className="profile-name-container">
              <Box className="profile-name">{profile.name}</Box>
              <Box className="profile-spaceName">{profile.spaceName}</Box>
            </Box>
            <Box className="profile-entranceUniv">
              학번: {profile.entranceUniv}
            </Box>
            <Box className="profile-activeYear-container">
              {profile.activeYear.map((year) => (
                <Box className="profile-activeYear">{year}</Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box className="profile-edit-button">
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setEditProfile(!editProfile);
            }}
          >
            프로필 편집
          </Button>
          <Button variant="outlined" size="small" onClick={onLogOutClick}>
            로그아웃
          </Button>
        </Box>
      </Box>
      {editProfile && (
        <Box className="container">
          <Box className="title">프로필 편집</Box>
          <Box className="profile-container">
            <Box>
              <Avatar
                src={profile.attachment}
                sx={{ width: 100, height: 100 }}
              />
              <input
                type="file"
                accept="image/*"
                className="profile-edit-file"
                onChange={onFileChange}
              />
            </Box>
            <Box>
              <Box className="profile-edit-input">
                <TextField
                  name="name"
                  label="이름"
                  variant="outlined"
                  size="small"
                  value={profile.name}
                  onChange={onChange}
                />
              </Box>
              <Box className="profile-edit-input">
                <TextField
                  name="spaceName"
                  label="스페이스네임"
                  variant="outlined"
                  size="small"
                  value={profile.spaceName}
                  onChange={onChange}
                />
              </Box>
              <Box className="profile-edit-input">
                <TextField
                  name="entranceUniv"
                  label="학번"
                  variant="outlined"
                  size="small"
                  type="number"
                  value={profile.entranceUniv}
                  onChange={onChange}
                />
              </Box>
              <Box className="profile-edit-input">
                <FormControl sx={{ width: 380 }} size="small">
                  <InputLabel id="demo-multiple-checkbox-label">
                    활동학기
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    name="activeYear"
                    value={profile.activeYear}
                    onChange={onChange}
                    input={<OutlinedInput label="활동학기" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        <Checkbox
                          checked={profile.activeYear.indexOf(year) > -1}
                        />
                        <ListItemText primary={year} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box className="profile-spaceName-info">
            *스페이스네임: 각 계정을 구분하기위한 고유아이디입니다. "@"+문자열로
            작성해주세요. (인스타그램 아이디와 같은 개념입니다. ex: @dlwlrma)
          </Box>
          <Box>
            <Button variant="outlined" size="small" onClick={onSaveProfile}>
              저장하기
            </Button>
          </Box>
        </Box>
      )}
      <Box className="container">
        <Box className="title">나의 예보기록</Box>
      </Box>
    </>
  );
};

export default SetProfile;

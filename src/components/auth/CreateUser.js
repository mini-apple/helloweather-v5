import React, { useState } from "react";
import { auth } from "fbase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function CreateUser({ setCreateAccout, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const onEmailCreate = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다. 비밀번호가 같은지 확인해주세요!");
      return;
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert(
          "계정생성 성공! 계정생성 후 반드시 프로필탭의 프로필 편집을 통해 초기프로필을 설정해주세요!"
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode: ", errorCode, "errorMessage: ", errorMessage);
        alert(
          `계정생성 오류정보\nerrorCode:  ${errorCode} \nerrorMessage:  ${errorMessage}`
        );
      });
  };

  const onGoogleCreate = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log(credential, token, user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box className="container">
      <Box className="title">5초 회원가입</Box>
      <Box className="sign-in-email-container">
        <Box>
          <Box className="email-input-box">
            <Box className="email-input-box-title">
              이메일/비밀번호 회원가입
            </Box>
            <Box className="email-input-field">
              <TextField
                fullWidth
                name="email"
                label="이메일"
                variant="outlined"
                size="small"
                value={email}
                onChange={onChange}
              />
            </Box>
            <Box className="email-input-field">
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  비밀번호
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  label="비밀번호"
                  name="password"
                  value={password}
                  onChange={onChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            <Box className="email-input-field">
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  비밀번호 확인
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  label="비밀번호 확인"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box>
              <Button
                fullWidth
                size="small"
                variant="outlined"
                onClick={onEmailCreate}
              >
                계정생성
              </Button>
            </Box>
          </Box>
          <Box>
            <Box className="email-input-box-title">소셜 회원가입</Box>
            <button onClick={onGoogleCreate} className="btn-google">
              Google로 계정생성하기
            </button>
          </Box>
        </Box>
      </Box>

      <Box className="sign-in-toggle">
        <Divider />
        <Button variant="text" onClick={() => setCreateAccout(false)}>
          로그인하기
        </Button>
      </Box>
    </Box>
  );
}

export default CreateUser;

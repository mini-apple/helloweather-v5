import React, { useState } from "react";
import { auth } from "fbase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function LoginUser({ setCreateAccout, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onEmailLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsLoggedIn(true);
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const onGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider).then(() => {
      setIsLoggedIn(true);
    });
  };

  return (
    <>
      <Box className="container">
        <Box className="title">로그인</Box>
        <Box className="sign-in-email-container">
          <Box>
            <Box>email</Box>
            <TextField
              name="email"
              label="E-mail"
              variant="outlined"
              size="small"
              value={email}
              onChange={onChange}
            />
          </Box>
          <Box>
            <Box>비밀번호</Box>
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              size="small"
              value={password}
              onChange={onChange}
            />
          </Box>
          <Box>
            <Button variant="outlined" onClick={onEmailLogin}>
              로그인
            </Button>
          </Box>
          <Box>
            <Button variant="outlined" onClick={onGoogleLogin}>
              Login with Google
            </Button>
          </Box>
          <Box>
            <Button variant="text" onClick={() => setCreateAccout(true)}>
              계정생성하기
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default LoginUser;

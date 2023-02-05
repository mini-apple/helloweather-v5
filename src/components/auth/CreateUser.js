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

function CreateUser({ setCreateAccout, setIsLoggedIn }) {
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

  const onEmailCreate = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode: ", errorCode, "errorMessage: ", errorMessage);
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

  return (
    <Box className="container">
      <Box className="title">회원가입</Box>
      <Box className="sign-in-email-container">
        <Box>
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
            <Button variant="outlined" onClick={onEmailCreate}>
              계정생성
            </Button>
          </Box>
        </Box>

        <Box>
          <Button variant="outlined" onClick={onGoogleCreate}>
            Google로 계정생성
          </Button>
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

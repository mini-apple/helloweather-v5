import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import LoginUser from "components/auth/LoginUser";
import CreateUser from "components/auth/CreateUser";

const Home = ({ isLoggedin, setIsLoggedIn }) => {
  const [createAccount, setCreateAccout] = useState(false);
  return (
    <>
      <Box className="container">
        <Box className="title">환영합니다.</Box>
      </Box>
      {isLoggedin ? (
        <Box className="container">
          <Box className="title">로그인 완료됨</Box>
        </Box>
      ) : (
        <>
          {createAccount ? (
            <Box>
              <CreateUser
                setCreateAccout={setCreateAccout}
                setIsLoggedIn={setIsLoggedIn}
              />
            </Box>
          ) : (
            <Box>
              <LoginUser
                setCreateAccout={setCreateAccout}
                setIsLoggedIn={setIsLoggedIn}
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Home;

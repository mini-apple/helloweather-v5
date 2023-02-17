import React, { useState } from "react";
import Box from "@mui/material/Box";
import LoginUser from "components/auth/LoginUser";
import CreateUser from "components/auth/CreateUser";
import { Link } from "react-router-dom";

const Home = ({ isLoggedIn, setisLoggedIn }) => {
  const [createAccount, setCreateAccout] = useState(false);
  return (
    <>
      {isLoggedIn ? (
        <>
          <Box className="container">
            <Box className="title">환영합니다!</Box>
            <Box className="gate-picture-container">
              <Box>
                <img className="gate-picture" src="img/001.png" />
                <Box className="gate-nav-container">
                  <Box className="gate-nav-box">
                    <Link to="/profile" className="gate-nav-li">
                      프로필
                    </Link>
                  </Box>
                  <Box className="gate-nav-box">
                    <Link to="/member" className="gate-nav-li">
                      Members
                    </Link>
                  </Box>
                  <Box className="gate-nav-box">
                    <Link to="/forecast" className="gate-nav-li">
                      온라인 예보게임
                    </Link>
                  </Box>
                  <Box className="gate-nav-box">
                    <Link to="/calc" className="gate-nav-li">
                      오프라인 채점하기
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>
          {createAccount ? (
            <Box>
              <CreateUser
                setCreateAccout={setCreateAccout}
                setisLoggedIn={setisLoggedIn}
              />
            </Box>
          ) : (
            <Box>
              <LoginUser
                setCreateAccout={setCreateAccout}
                setisLoggedIn={setisLoggedIn}
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Home;

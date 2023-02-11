import React, { useState, useEffect } from "react";
import AppRouter from "./router";
import { startFirebaseApp, auth } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user: ", Boolean(user));
        setUserObj(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userObj={userObj}
        />
      ) : (
        "initializing..."
      )}
    </>
  );
}

export default App;

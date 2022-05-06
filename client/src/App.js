import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import MainPage from "./components/MainPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";

var xmlhttp = new XMLHttpRequest();

const App = (props) => {
  const [username, setUsername] = useState("");
  const [songList, setSongList] = useState([]);

  function logout() {
    sessionStorage.setItem("username", "");
    setUsername("");
    setSongList([]);
  }

  useEffect(async () => {
    if (username !== "") {
      sessionStorage.setItem("username", username);
      await xmlhttp.open(
        "GET",
        `http://localhost/phpmyadmin/int_sys_db_auth/get_songs.php?username=${username}`,
        true
      );
      xmlhttp.send();
      xmlhttp.onload = () => {
        var data = JSON.parse(xmlhttp.responseText);
        Object.keys(data).forEach((key) => {
          var notes = JSON.parse(data[key].notes);
          var newSheet = [];
          Object.keys(notes).forEach((note) => {
            newSheet[note] = notes[note];
          });
          data[key].notes = newSheet;
        });
        setSongList(data);
      };
    } else {
      const tempname = sessionStorage.getItem("username");
      if (tempname !== undefined && tempname !== null) setUsername(tempname);
    }
  }, [username]);

  return (
    <div className="page">
      <Switch>
        {username === "" && (
          <Route
            path="/register"
            component={() => <RegisterPage setUsername={setUsername} />}
          />
        )}
        {username === "" && (
          <Route
            path="/login"
            component={() => <LoginPage setUsername={setUsername} />}
          />
        )}
        <Route
          path="/"
          username={username}
          component={() => (
            <MainPage
              username={username}
              logout={logout}
              songList={songList}
              setSongList={setSongList}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;

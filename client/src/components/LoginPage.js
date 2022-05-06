import React, { useState } from "react";
import SignOut from "../utils/icons/sign-out.svg";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

var xmlhttp = new XMLHttpRequest();

const exitVariant = {
  hidden: { opacity: 1, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: {
    opacity: 0,
    x: 8,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const errorVariant = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const LoginPage = ({ setUsername }) => {
  let history = useHistory();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showExitText, setShowExitText] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="mainPage">
      <Header />
      <p className="authHeader">Login</p>
      <form
        className="authForm"
        onSubmit={async (e) => {
          e.preventDefault();
          await xmlhttp.open(
            "GET",
            `http://localhost/phpmyadmin/int_sys_db_auth/login_user.php?email=${loginEmail}&password=${loginPassword}&submit=Login`,
            true
          );
          xmlhttp.send();
          xmlhttp.onload = () => {
            if (xmlhttp.responseText !== "") {
              setUsername(xmlhttp.responseText);
              history.push("/");
            } else {
              setError(true);
            }
          };
        }}
      >
        <p className="authInputContainer">
          Email:{" "}
          <input
            className="authInput"
            type="text"
            name="email"
            onChange={(e) => setLoginEmail(e.target.value)}
            onFocus={() => setError(false)}
          />
        </p>
        <p className="authInputContainer">
          Password:{" "}
          <input
            className="authInput"
            type="password"
            name="password"
            onChange={(e) => setLoginPassword(e.target.value)}
            onFocus={() => setError(false)}
          />
        </p>
        <div className="errorTextWrapper">
          <AnimatePresence>
            {error ? (
              <motion.div
                className="errorText"
                variants={errorVariant}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                Email or Password is Incorrect
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <div className="submitRow">
          <input
            className="submitButton"
            type="submit"
            name="submit"
            value="Login"
          />

          <Link to="/register" className="submitChangePage">
            Register?
          </Link>
        </div>
      </form>
      <Link to="/" className="authExitLink">
        <img
          src={SignOut}
          className="authExit"
          onMouseEnter={() => setShowExitText(true)}
          onMouseLeave={() => setShowExitText(false)}
        />
        <AnimatePresence>
          {showExitText && (
            <motion.p
              className="authExitText"
              variants={exitVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              Back
            </motion.p>
          )}
        </AnimatePresence>
      </Link>
    </div>
  );
};

export default LoginPage;

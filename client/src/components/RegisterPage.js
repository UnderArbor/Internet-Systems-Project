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

const RegisterPage = ({ setUsername }) => {
  let history = useHistory();
  const [showExitText, setShowExitText] = useState(false);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [error, setError] = useState(false);
  return (
    <div className="mainPage">
      <Header />
      <p className="authHeader">Register</p>
      <form
        className="authForm"
        onSubmit={async (e) => {
          e.preventDefault();
          await xmlhttp.open(
            "GET",
            `http://localhost/phpmyadmin/int_sys_db_auth/register_user.php?name=${registerUsername}&email=${registerEmail}&password=${registerPassword}&submit=Register`,
            true
          );
          xmlhttp.send();
          xmlhttp.onload = () => {
            if (xmlhttp.responseText === "New record created successfully") {
              setUsername(registerUsername);
              history.push("/");
            } else {
              setError(true);
            }
          };
        }}
      >
        <p className="authInputContainer">
          Name:{" "}
          <input
            className="authInput"
            type="text"
            name="name"
            onChange={(e) => setRegisterUsername(e.target.value)}
            onFocus={() => setError(false)}
          />
        </p>
        <p className="authInputContainer">
          Email:{" "}
          <input
            className="authInput"
            type="text"
            name="email"
            onChange={(e) => setRegisterEmail(e.target.value)}
            onFocus={() => setError(false)}
          />
        </p>
        <p className="authInputContainer">
          Password:{" "}
          <input
            className="authInput"
            type="password"
            name="password"
            onChange={(e) => setRegisterPassword(e.target.value)}
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
                {registerUsername === ""
                  ? "Username Not Defined"
                  : registerEmail === ""
                  ? "Email Not Defined"
                  : registerPassword === ""
                  ? "Password Not Defined"
                  : "Username or Email Duplicated"}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <div className="submitRow">
          <input
            className="submitButton"
            type="submit"
            name="submit"
            value="Register"
          />
          <Link to="/login" className="submitChangePage">
            Login?
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

export default RegisterPage;

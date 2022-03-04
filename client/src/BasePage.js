import React, { useState } from "react";

const BasePage = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [activity, setActivity] = useState("");
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);

  return (
    <div className="column">
      <div className="inputColumn column">
        <p className="inputHeader">Name</p>
        <input
          className="input"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
      </div>
      <div className="inputColumn column">
        <p className="inputHeader">Email</p>
        <input
          className="input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
      </div>
      <div className="inputColumn column">
        <p className="inputHeader">Favorite Activity</p>
        <input
          className="input"
          onChange={(e) => {
            setActivity(e.target.value);
          }}
        ></input>
      </div>
      <div className="inputColumn column">
        <p className="inputHeader">Enter Summation Here</p>
        <input
          className="input"
          onChange={(e) => {
            setNumber1(e.target.value);
          }}
        ></input>
        <input
          className="input"
          onChange={(e) => {
            setNumber2(e.target.value);
          }}
        ></input>
      </div>
      <button
        className="submitButton"
        onClick={() => {
          alert(
            `Your name is ${
              name.length > 0 ? name : "_blank_"
            }, your email is ${
              email.length > 0 ? email : "_blank_"
            }, and your favorite activity is ${
              activity.length > 0 ? activity : "_blank_"
            }.
            \n${
              !isNaN(number1) && !isNaN(number2)
                ? `Your summation is ${Number(number1) + Number(number2)}.`
                : "One of the summation options is not a number."
            }
            `
          );
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default BasePage;

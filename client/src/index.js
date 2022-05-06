import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import App from "./App";

if (process.env.NODE_ENV !== "production") {
  axios.defaults.baseURL = "http://localhost:3000";
} else {
  axios.defaults.baseURL = window.location.origin;
}
axios.defaults.headers.post["Content-Type"] = "application/json";

import "./css/reset.scss";
import "./css/core.scss";
import "./css/auth.scss";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

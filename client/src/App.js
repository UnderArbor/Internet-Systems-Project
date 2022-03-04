import React from "react";
import { Switch, Route } from "react-router-dom";

// import FirstPage from "./FirstPage";
// import SecondPage from "./SecondPage";
// import ThirdPage from "./ThirdPage";
import BasePage from "./BasePage";

import "./css/core.scss";

const App = () => {
  return (
    <Switch>
      {/* <Route path="/first" component={FirstPage} />
      <Route path="/second" component={SecondPage} />
      <Route path="/third" component={ThirdPage} /> */}
      <Route path="/" component={BasePage} />
    </Switch>
  );
};

export default App;

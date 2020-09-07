import React from "react";
import ReactDOM from "react-dom";
import SendCredentials from "./SendCredentials";
import Planets from "./Planets";

const App = () => {
  return (
    <div>
      <h1>Jira Bypass</h1>
      <SendCredentials />
      <Planets />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

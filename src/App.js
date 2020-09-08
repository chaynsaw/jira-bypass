import React from "react";
import ReactDOM from "react-dom";
import SendCredentials from "./SendCredentials";


const App = () => {
  return (
    <div>
      <h1>Jira Bypass</h1>
      <SendCredentials />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

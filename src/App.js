import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import SendCredentials from "./SendCredentials";

function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

const App = () => {

  let jiraBypassID = sessionStorage.jiraBypassID

  if (!jiraBypassID) {
    sessionStorage.jiraBypassID = create_UUID()
  } 
  console.log(jiraBypassID)
  const options = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jiraBypassID: sessionStorage.jiraBypassID
    })
  }

  let userExists = false;
  useEffect(() => {
    fetch('/checkuser', options, (req, res) => {
      return res
    }).then(data => {
      if (data.status === 200) {
        userExists = true
      } else {
        userExists = false
      }
    })
  })
  return (
    <div>
      <h1>Jira Bypass</h1>
      <SendCredentials jiraBypassID={jiraBypassID} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import SendCredentials from "./SendCredentials";
import JiraList from "./JiraList";
import Collapsible from "react-collapsible";

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
  const options = {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jiraBypassID: sessionStorage.jiraBypassID
    })
  }

  const [userExists, setuserExists] = useState(false);

  useEffect(() => {
    fetch('/checkuser', options, (req, res) => {
      return res
    }).then(data => {
      if (data.status === 404) {
        return
      } else {
        setuserExists(true)
      }
    })
  })
  return (
    <div>
      <h1>Jira Bypass</h1>
      {userExists ?  
        <Collapsible trigger="RE-ENTER CREDENTIALS"> 
          <SendCredentials jiraBypassID={jiraBypassID} userExists={userExists} />
        </Collapsible>:
        <SendCredentials jiraBypassID={jiraBypassID} userExists={userExists} />}
      {userExists ? <JiraList jiraBypassID={jiraBypassID} userExists={userExists} />: ""}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

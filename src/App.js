import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import SendCredentials from "./SendCredentials";
import JiraList from "./JiraList";
import Collapsible from "react-collapsible";
import CreateNewJira from "./CreateNewJira";
import SprintsList from "./SprintsList"
import fetch from "node-fetch";

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
        setuserExists(true)
        // return
      } else {
        setuserExists(true)
      }
    })
  }, [])

  const [activeSprints, setActiveSprints] = useState([]);

  useEffect(() => {
    fetch('/getsprints', {}, (req, res) => {
      return res
    }).then(data => {
      return data.json()
    }).then(data => {
      setActiveSprints(data.values)
    })
    .catch(err => console.error(err));
  }, [])
  
  const [currentActiveSprint, setCurrentActiveSprint] = useState(1296)

  return (
    <div>
      <h1>Jira Bypass</h1>
      <SprintsList 
        activeSprints={activeSprints} 
        onClickHandler={setCurrentActiveSprint}/>
      <br />
      {userExists ?  
        <Collapsible trigger="RE-ENTER CREDENTIALS (click here)">
          <SendCredentials 
            jiraBypassID={jiraBypassID} 
            userExists={userExists} />
        </Collapsible>:
          <SendCredentials 
            jiraBypassID={jiraBypassID} 
            userExists={userExists} />}
      {userExists ? <JiraList 
        jiraBypassID={jiraBypassID}
        currentActiveSprint={currentActiveSprint} 
        userExists={userExists} />: null}
      <br />
      <CreateNewJira />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

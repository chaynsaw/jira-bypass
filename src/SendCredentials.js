import React, { useState, useEffect } from "react";

const SendCredentials = (props) => {
  const [jiras, setJiras] = useState(0);

  return (
    <div className="jira-params">
      <form action="/setcreds" method="POST">
        <label htmlFor="username">
          Username
          <input id="username" name='username' placeholder="username" />
        </label><br />
        
        <label htmlFor="apitoken">
          API Token
          <input id="apitoken" name='apitoken' placeholder="API Token" type="password" />
        </label><br />
        
        <label htmlFor="subDomain">
          Domain Name
          <input id="subDomain" name='subDomain' placeholder="subdomain (EG striiv)   " />
        </label><br />

        <input type="hidden" name="jiraBypassID" value={props.jiraBypassID}/>


        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SendCredentials;

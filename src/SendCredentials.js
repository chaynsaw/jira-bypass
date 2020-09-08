import React, { useState, useEffect } from "react";

const SendCredentials = () => {
  const Username = "byah";
  const Password = "Enter password here";
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
        
        <label htmlFor="domainName">
          Domain Name
          <input id="domainName" name='domainName' placeholder="API Token" />
        </label><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default SendCredentials;

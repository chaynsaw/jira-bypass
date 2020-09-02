import React from "react";

const SendCredentials = () => {
  const Username = "Enter name here";
  return (
    <div className="search-params">
      <form>
        <label htmlFor="Username">
          Username
          <input id="Username" value={Username} placeholder="Username" />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SendCredentials;

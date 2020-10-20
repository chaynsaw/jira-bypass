import React from 'react';

const CreateNewJira = (props) => {
  return ( 
      <form action="/createjira" method="POST">
          <input id="summary" name='summary' placeholder="Create New Jira" size="70"/>
        <input type="submit" value="Submit" />
      </form>
  );
}
 
export default CreateNewJira;
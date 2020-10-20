import React, { useState, useEffect } from 'react';

const SprintToggler = (props) => {
  return (  
    <form action="/togglesprint" method="POST">
        <input type="hidden" name="issuekey" value={props.issuekey}/>
        <input type="hidden" name="sprint" value={props.sprint}/>
        <input type="hidden" name="action" value={props.action}/>
        <input type="submit" value="Toggle" />
    </form>
  );
}
 
export default SprintToggler;
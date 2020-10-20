import React, { useEffect, useState } from "react";
import SprintToggler from "./SprintToggler";
import ActionsPanel from "./ActionsPanel";

const Jira = (props) => {
  let sprints = props.sprints
  let currentActiveSprint = props.currentActiveSprint

  return (
    <tr>
      <td>{props.issuekey}</td>
      <td>{props.summary}</td>
      <td>{props.status.name}</td>
      <td>{props.priority ? props.priority.name : null}</td>
      <td>{sprints.some(item => item.id === currentActiveSprint) ? "YES" : "NO"}</td>
      <td>{sprints.some(item => item.id === currentActiveSprint) ? 
        <SprintToggler issuekey={props.issuekey} sprint={currentActiveSprint} action="remove"/> : 
        <SprintToggler issuekey={props.issuekey} sprint={currentActiveSprint} action="add"/>}
      </td>
      <td>{props.storyPoints ? props.storyPoints : null}</td>
      <td><ActionsPanel issuekey={props.issuekey}/></td>
    </tr>
  )
}

export default Jira;

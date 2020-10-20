import React, { useEffect, useState } from "react";
import Jira from "./Jira";

const JiraList = (props) => {
  const [jiras, setJiras] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`/testjiralist`, (req, res) => {
      return res
    }).then(data => {
      return data.json()
    }).then(data => {
      setJiras(data.issues)
      setIsLoading(false)
    })
  }, [])
  
  return (
    <table border="1px solid black">
      <tr>
        <th>KEY</th>
        <th>SUMMARY</th>
        <th>STATUS</th>
        <th>PRIORITY</th>
        <th colspan="2" scope="colgroup">SPRINT</th>
        <th>PTS</th>
        <th>ACTIONS</th>
      </tr>
      {jiras.map((issue) => 
        <Jira 
          issuekey={issue.key} 
          summary={issue.fields.summary} 
          status={issue.fields.status}
          priority={issue.fields.priority}
          sprints={issue.fields.customfield_10007 ? issue.fields.customfield_10007: []}
          storyPoints={issue.fields.customfield_10004}
          currentActiveSprint={props.currentActiveSprint}
        />
      )}
    </table>
  )
}

export default JiraList;
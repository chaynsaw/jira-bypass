import React, { useEffect } from "react";

const JiraList = (props) => {
  let jiraListData
  useEffect(() => {
    if (props.userExists) {
      fetch(`/jiralist/${props.jiraBypassID}`, (req, res) => {
        return res
      }).then(data => {
        return data.json()
      }).then(data => {
        jiraListData = data
      })
    } else {
      console.log('no data retrieved for jira list')
    }
  })

  return (
    <div>JIRA LIST!</div>
  )
}

export default JiraList;
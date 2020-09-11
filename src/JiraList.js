import React, { useEffect } from "react";

const JiraList = (props) => {
  let jiraListData
  useEffect(() => {
    console.log(props.userExists)
    if (props.userExists) {
      fetch(`/jiralist/${props.jiraBypassID}`, (req, res) => {
        return res
      }).then(data => {
        return data.json()
      }).then(data => {
        jiraListData = data
        console.log(jiraListData)
      })
    } else {
      console.log('no data')
    }
  })

  return (
    <div>I AM THE JIRA LIST!!!!</div>
  )
}

export default JiraList;
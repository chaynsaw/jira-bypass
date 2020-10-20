import React, { useState, useEffect } from 'react';
import fetch from 'node-fetch';

const ActionsPanel = (props) => {
  const [actions, setActions] = useState([])
  const createActionButton = (transitionID) => {
    fetch('/actions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        issuekey: props.issuekey,
        id: transitionID
      })
    }).then(response => {
      return response
    }).then(data => {
      if (data.redirected) {
        window.location.href = data.url;
    }
    }).catch(err => console.error(err))
  }
  useEffect(() => {
    fetch(`/gettransitions`, {
      method: "POST",
      body: JSON.stringify({
        issuekey: props.issuekey
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }, (req, res) => {
      return res
    }).then(data => {
      return data.json()
    }).then(data => {
      setActions(data.transitions)
    })
  }, [])

  return (
    <div>
      {actions.map((item) => {
        return (
          <div>
            <button onClick={() => createActionButton(item.id)}>{item.name}</button>
          </div>
        )
      })}
    </div>
  )
}
 
export default ActionsPanel;
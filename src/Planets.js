import React, { useState, useEffect } from "react";

const Planets = () => {
  const [hasError, setErrors] = useState(false);
  const [planets, setPlanets] = useState({});

  const url = 'https://striiv.atlassian.net/rest/api/3/search?'
  const searchObj = {
    jql: 'assignee = currentUser()',
    fields: 'summary,content',
  }
  const params = new URLSearchParams(searchObj)
  console.log(params.toString())
  const searchUrl = url + params.toString()
  fetch(searchUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        'chsiao@biointellisense.com:yBDsfgbUqNXoAKthLwZU90CA'
      ).toString('base64')}`,
      'Accept': 'application/json'
    }
  })
    .then(response => {
      console.log(
        `Response: ${response.status} ${response.statusText}`
      );
      return response.text();
    })
    .then(text => console.log(text))
    .catch(err => console.error(err));

    return <div>{JSON.stringify(planets)}</div>;
  };
export default Planets;
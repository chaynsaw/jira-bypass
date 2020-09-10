const path = require("path");
const express = require("express");
const app = express(); // create express app
const fetch = require('node-fetch')
const bodyParser = require("body-parser")

// add middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "dist")));
app.use(express.static("public"));
app.use(express.json())

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
//   next();
// });

// start express server on port 5000
const users = {
  '2fa2ed9e-568f-40a7-8bb8-a2e626dfb1d5': 'bboy'
}


app.post("/setcreds", function(req,res) {
  let jiraBypassID = req.body.jiraBypassID
  let apitoken = req.body.apitoken
  let username = req.body.username
  let authBuffer = `Basic ${Buffer.from(`${username}:${apitoken}`).toString('base64')}`
  let url = `https://${req.body.subDomain}.atlassian.net/rest/api/3/search?`
  users[jiraBypassID] = {
    authBuffer,
    url
  }
  console.log(users)
  res.redirect('/')
})

app.post('/checkuser', function(req,res) {
  if (req.body.jiraBypassID in users) {
    res.send(users[req.body.jiraBypassID])
  } else {
    res.status(404)
  }
  res.send()
})

app.get('/checkvariables', (req, res) => {
  res.send(`${username} ${apitoken} ${domainName}`)
})

app.get('/jira', function(req, res) {
  const url = `https://${domainName}.atlassian.net/rest/api/3/search?`
  const searchObj = {
    jql: 'assignee = currentUser() and status is not closed',
    fields: 'summary',
  }
  const params = new URLSearchParams(searchObj)
  console.log(params.toString())
  const searchUrl = url + params.toString()
  fetch(searchUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        `${username}:${apitoken}`
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
    .then(data => {
      res.send(data)
    })
    .catch(err => console.error(err));
  })

  app.listen(5000, () => {
    console.log("server started on port 5000");
  });
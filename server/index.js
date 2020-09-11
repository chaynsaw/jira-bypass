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
const users = {}

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
  res.redirect('/')
})

app.post('/checkuser', function(req,res) {
  if (req.body.jiraBypassID in users) {
    res.status(200)
  } else {
    res.status(404)
  }
  res.send()
})

app.get('/jiralist/:userid', function(req, res) {
  const url = users[req.params.userid].url
  const searchObj = {
    jql: 'assignee = currentUser() and status not in (closed, done, resolved)',
    fields: 'summary',
  }
  const params = new URLSearchParams(searchObj)
  const searchUrl = url + params.toString()
  fetch(searchUrl, {
    method: 'GET',
    headers: {
      'Authorization': users[req.params.userid].authBuffer,
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
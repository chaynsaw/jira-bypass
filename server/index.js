const path = require("path");
const express = require("express");
const app = express(); // create express app
const fetch = require('node-fetch')

// add middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "dist")));
app.use(express.static("public"));

// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
//   next();
// });

// start express server on port 5000
let apitoken
let username
let domainName

app.post("/setcreds", function(req,res) {
  apitoken = req.body.apitoken
  username = req.body.username
  domainName = req.body.domainName
  res.end()
})
app.get('/hi', function(req,res) {
  res.send('hi')
})
app.get('/checkvariables', (req, res) => {
  res.send(`${username} ${apitoken} ${domainName}`)
})
app.get('/jira', function(req, res) {
  const url = `https://${domainName}.atlassian.net/rest/api/3/search?`
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
// //Install express server
// const express = require('express');
// const path = require('path');

// const app = express();

// // Serve only the static files form the dist directory
// app.use(express.static(__dirname + '/dist/<name-of-app>'));

// app.get('/*', function(req,res) {
    
// res.sendFile(path.join(__dirname+'/dist/<name-of-app>/index.html'));
// });

// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);


const path = require('path')
const express = require('express')
const app = express()
const https = require('https')
const request = require('request')
const queryString = require('query-string')
const cors = require('cors')
const bodyParser = require('body-parser')
// Serve static files
app.use(express.static(__dirname + '/dist/'))
app.use(cors())

// support parsing of application/json type post data
app.use(bodyParser.json())

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// environment variables
process.env.force_url = 'https://hipaacomplete--dev1.cs41.my.salesforce.com/services'

app.get('/oauth2/auth', function(req, res) {
  request.post( { headers: {'content-type' : 'application/x-www-form-urlencoded'}, 
                  url: `${process.env.force_url}/oauth2/token`, 
                  body: queryString.stringify({
                    grant_type: 'password', 
                    client_id: '3MVG98EE59.VIHmwm4v0e01Xh4GkXAFFiQjl8GLNmA_u8hN7AM2dbd1iYR8LSNhWWQ4cwa03W1E.Tb5X3q7JZ',
                    client_secret: '5F0EFA9A8FB1696226E71B165EAF14B7C037E211758B06FBC09E764E3B1019E0', 
                    username: 'hello42@cyntexa.com',
                    password: 'Cyntexa@123WqcLKkd0BpSdG8fKqkAHzwbZ'
                  })
                }
              ,
              function(error, response, body){
                res.status(response.statusCode).send(JSON.parse(body))
              }
  ) 
})

app.post('/force/queryALL', function(req, res) {
  request.get( { 
                  headers: {'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${req.body.access_token}`}, 
                  url: `${process.env.force_url}/data/v45.0/queryAll/?q=${req.body.query}`, 
               }
              ,
              function(error, response, body){
                res.status(response.statusCode).send(JSON.parse(body))
              }
  )
})

app.post('/force/getbreadcrumb', function(req, res) {
  request.post( { 
                  headers: {'Content-Type' : 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${req.body.access_token}`}, 
                  url: `${process.env.force_url}/apexrest/getParentRec`, 
                  body: queryString.stringify({
                    childid: `${req.body.childid}`,
                    parentid: `${req.body.parentid}`,
                  })
               }
              ,
              function(error, response, body){
                res.status(200).send(JSON.parse(body))
              }
  )
})

//=========== HIPAA, OSHA (Create, Update, Delete) =====================================================================================
app.post('/hipaa/create', function(req, res){
  request.post( { 
                  headers: {'Content-Type' : 'application/json', 'Accept': 'application/json'}, 
                  url: `https://${req.body.base_url}/api/1.0/index.php/${req.body.api_url}?access_token=${req.body.access_token}`, 
                  body: req.body.form
                }
              ,
              function(error, response, body){
                res.status(response.statusCode).send(JSON.parse(body))
              }
  )
})

app.post('/hipaa/update', async (req, res) => {
  try {
    var body = await postPromise(req.body.base_url, req.body.api_url, req.body.access_token, req.body.form)
    console.log(body)
    res.status(200).send(JSON.parse(body))
  } catch(error){
    res.status(400).send(error)
  }
  
})

app.post('/hipaa/delete', function(req, res){
  request.delete( { 
                  headers: {'Accept': 'application/json'}, 
                  url: `https://${req.body.base_url}/api/1.0/index.php/${req.body.api_url}/${req.body.id}?access_token=${req.body.access_token}`,
                }
              ,
              function(error, response, body){
                res.status(response.statusCode).send(JSON.parse(body))
              }
  )
})

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port !'))

function postPromise(base_url, api_url, access_token, form) {
  return new Promise((resolve, reject) => {
    request.post( { 
          headers: {'Content-Type' : 'application/json', 'Accept': 'application/json'}, 
          url: `https://${base_url}/api/1.0/index.php/${api_url}/?access_token=${access_token}`,
          body: form
        }
      ,
      function(error, response, body){
        if (error) {
          reject(error)
        } else {
          resolve(body)
        } 
      }
    )
  })
}
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
// Serve static files
app.use(express.static(__dirname + '/dist/'))
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/oauth2/auth', function(req, res) {
  request.post( { headers: {'content-type' : 'application/x-www-form-urlencoded'}, 
                  url: 'https://hipaacomplete--dev1.cs41.my.salesforce.com/services/oauth2/token', 
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
                res.status(200).send(JSON.parse(body));
              }
  ); 
});

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// default Heroku port
app.listen(process.env.PORT || 5000, () => console.log('Example app listening on port !'))
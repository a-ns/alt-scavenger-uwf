// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express')        // call express
const app = express()                 // define our app using express
const bodyParser = require('body-parser')
require('./db/db.js')
let router = require('./router/router.js')
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let port = process.env.PORT || 8080        // set our port

app.get('/', function (req, res) {
  res.json({message: 'Index page. Go away'})
})
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router)

// START THE SERVER
// =============================================================================
app.listen(port)
console.log('Magic happens on port ' + port)

module.exports = app

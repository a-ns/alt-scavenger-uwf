// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express')        // call express
const app = express()                 // define our app using express
const bodyParser = require('body-parser')
let mongoose = require('./mongoose/mongoose.js')
var Scobject = require('./models/scobject')
let router = require('./router/router.js')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let port = process.env.PORT || 8080        // set our port

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

// more routes for our API will happen here



router.route('/scobjects/:scobject_id')
      .get(function (req, res) {
        Scobject.findById(req.params.scobject_id, function (err, scobject) {
          if (err)
            res.send('Something went wrong')
          res.json(scobject)
        })
      })
      .put(function (req, res) {
        Scobject.findById(req.params.scobject_id, function (err, scobject) {
          scobject.name = req.body.name

          scobject.save(function (err) {
            if (err) {
              res.send('Something went wrong')
            }
            else {
              res.json({message: 'Scobject updated'})
            }
          })
        })
      })
      .delete(function (req, res) {
        Scobject.remove({
          _id: req.params.scobject_id
        }, function (err, scobject) {
          if (err) {
            res.send('Something went wrong')
          }
          else {
            res.json({message: 'Scobject deleted'})
          }
        })
      })

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router)

// START THE SERVER
// =============================================================================
app.listen(port)
console.log('Magic happens on port ' + port)

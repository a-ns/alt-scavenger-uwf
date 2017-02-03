// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express')        // call express
const app = express()                 // define our app using express
const bodyParser = require('body-parser')
let mongoose = require('mongoose')
var Scobject = require('./models/scobject')

mongoose.connect(process.env.MONGODB_URI)

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let port = process.env.PORT || 8080        // set our port

// ROUTES FOR OUR API
// =============================================================================
let router = express.Router()              // get an instance of the express Router

router.use(function (req, res, next) {
  console.log('This needs to do logging stuff')
  next()
})



app.get('/', function (req, res) {
  res.json({message: 'Index page. Go away'})
})
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

// more routes for our API will happen here
router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' })
})

router.route('/scobjects')
      .post(function (req, res){
        var scobject = new Scobject()
        scobject.name = req.body.name
        console.log(scobject)
        scobject.save(function (err) {
          if (err)
            res.send ('Something went wrong')
          else {
            res.json({message: 'Scobject created'})
          }
        })
      })
      .get(function (req, res) {
        Scobject.find(function (err, scobjects) {
          if (err) {
            res.send(err)
          }
          res.json(scobjects)
        })
      })

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

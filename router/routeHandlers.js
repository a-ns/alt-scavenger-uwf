let uuidV4 = require('uuid/v4')

let Locations = require('../models/Locations.js')
let db = require('../db/db.js')

var apiGet = function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' })
}

var locationsGet = function (req, res) {
  Locations.Location.find(function (err, locations) {
    if (err) {
      res.send(err)
    }
    res.json(locations)
  })
}

var outsideLocationsPost = function (req, res) {
  var outsideLocation = new Locations.OutsideLocation()
  outsideLocation.room = req.body.room
  outsideLocation.uuid = uuidV4()
  outsideLocation.desc = req.body.desc
  outsideLocation.building = req.body.building

  outsideLocation.save(function (err) {
    if (err) {
      res.send('Something went wrong')
    }
    else {
      res.json({message: 'Location created successfully.',
                uuid: outsideLocation.uuid
                })
    }
  })
}

var outsideLocationsGet = function (req, res) {
  Locations.OutsideLocation.find(function (err, location) {
    if (err) {
      res.send(err)
    }
    res.json(location)
  })
}

var insideLocationsPost = function (req, res) {
  var insideLocation = new Locations.InsideLocation()
  insideLocation.room = req.body.room
  insideLocation.uuid = uuidV4()
  insideLocation.desc = req.body.desc
  insideLocation.building = req.body.building

  insideLocation.save(function (err) {
    if (err) {
      res.send('Something went wrong')
    }
    else {
      res.json({message: 'Location created successfully.',
                uuid: insideLocation.uuid
                })
    }
  })
}

var insideLocationsGet = function (req, res) {
  Locations.InsideLocation.find(function (err, location) {
    if (err) {
      res.send(err)
    }
    res.json(location)
  })
}

var locationsPost = function (req, res) {
  res.status(400).send('Error: POST only available on /api/locations/inside or /api/locations/outside')
}

var specificOutsideLocationGet = function(req, res) {
  Locations.OutsideLocation.findOne({uuid: req.params.uuid}, function (err, outsideLocation){
    if (err || outsideLocation == null) {
      res.status(404).send()
    }
    else {
      res.json(outsideLocation)
    }
  })
}

module.exports = { outsideLocationsPost, outsideLocationsGet, locationsGet, insideLocationsGet, insideLocationsPost, apiGet , locationsPost , specificOutsideLocationGet}

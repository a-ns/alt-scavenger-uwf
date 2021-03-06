let uuidV4 = require('uuid/v4')

let Locations = require('../models/Locations.js')
let db = require('../db/db.js')

var apiGet = function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' })
}


/*
* Route handler for GET /api/locations
* Returns all the locations
*/
var locationsGet = function (req, res) {
  Locations.Location.find(function (err, locations) {
    if (err) {
      res.send(err)
    }
    res.json(locations)
  })
}

/*
* Route handler for DELETE /api/locations
* Remove an object
* Returns the old copy
* @required UUID of object to delete
*/
var locationsDelete = function (req, res) {
  if (!req.body.uuid) {
    res.status(400).send('UUID required')
  }
  else {
    var query = { 'uuid': req.body.uuid}
    Locations.Location.findOneAndRemove(query, function (err, doc, result) {
      if (err) {
        console.log(err)
        res.status(500).send()
      }
      else {
        res.send(doc + 'deleted')
      }
    })
  }
}

/*
* Route handler for PUT /api/locations
* Updates information of an object
* @required UUID of object to update
* @params [desc], [building], [room]
*/
var locationsPut = function (req, res) {
  if (!req.body.uuid) {
    res.status(400).send('UUID required')
  }
  else {
    var query = { 'uuid': req.body.uuid }
    var updateData = {}
    if (req.body.desc) {
      updateData.desc = req.body.desc
    }
    if (req.body.building) {
      updateData.building = req.body.building
    }
    if (req.body.room) {
      updateData.room = req.body.room
    }
    Locations.Location.findOneAndUpdate(query, updateData, {new: true}, function (err, doc) {
      if(err) {
        console.log(err)
        res.status(500).send('Internal server error')
      }
      else {
        res.json(doc)
      }
    })
  }
}

/*
* Route handler for POST /api/locations/outside
* Adds a new Outside Location
* @params [desc], [building]
*/
var outsideLocationsPost = function (req, res) {
  var outsideLocation = new Locations.OutsideLocation()
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

/*
* Route handler for GET /api/locations/outside
* Returns all the outside locations
*/
var outsideLocationsGet = function (req, res) {
  Locations.OutsideLocation.find(function (err, location) {
    if (err) {
      res.send(err)
    }
    res.json(location)
  })
}

/*
* Route handler for POST /api/locations/inside
* Adds a new object
* @params [desc], [building], [room]
*/
var insideLocationsPost = function (req, res) {
  var insideLocation = new Locations.InsideLocation()
  insideLocation.room = req.body.room
  insideLocation.uuid = uuidV4()
  insideLocation.desc = req.body.desc
  insideLocation.building = req.body.building

  insideLocation.save(function (err) {
    if (err) {
      res.send(err)
    }
    else {
      res.json({message: 'Location created successfully.',
                uuid: insideLocation.uuid
                })
    }
  })
}

/*
* Route handler for GET /api/locations/inside
* returns all the inside locations
*/
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

/*
* Route handler for GET /api/locations/outside/:uuid
* Return a specific outside location
*/
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

module.exports = { locationsDelete, locationsPut, outsideLocationsPost, outsideLocationsGet, locationsGet, insideLocationsGet, insideLocationsPost, apiGet , locationsPost , specificOutsideLocationGet}

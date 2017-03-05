var Scobject = require('../models/scobject')
var getApiDefault = function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' })
}

var scobjectsPost = function (req, res) {
  var scobject = new Scobject()
  scobject.name = req.body.name
  console.log(scobject)
  scobject.save(function (err) {
    if (err) {
      res.send('Something went wrong')
    }
    else {
      res.json({message: 'Scobject created'})
    }
  })
}

var scobjectsGet = function (req, res) {
  Scobject.find(function (err, scobjects) {
    if (err) {
      res.send(err)
    }
    res.json(scobjects)
  })
}

module.exports = {getApiDefault, scobjectsPost, scobjectsGet}

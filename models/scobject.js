let mongoose = require('mongoose')
let Schema = mongoose.Schema

var ScobjectSchema = new Schema({
  name: String,
  location: String
})

module.exports = mongoose.model('Scobject', ScobjectSchema)

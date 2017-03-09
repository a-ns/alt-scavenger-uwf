let mongoose = require('mongoose')
let Schema = mongoose.Schema

let options = { discriminatoryKey: 'kind' }

let userSchema = new Schema(
  {
    uuid: String,
    name: String,
    currentLocation: { type: Schema.ObjectId, ref: 'Location'}

  }, options)

let User = mongoose.model('Location', userSchema)

let studentSchema = new Schema(
  {
    visitedLocations: [{ type: Schema.ObjectId, ref: 'Location'}]
  }, options)

let facultySchema = new Schema(
  {
    office: { type: Schema.ObjectId, ref: 'Location'},
    dept: String,
    desc: String,
    misc: [String]
  }, options)

let StudentUser = User.discriminator('InsideLocation', studentSchema)

let FacultyUser = User.discriminator('OutsideLocation', facultySchema)

module.exports = { User, StudentUser, FacultyUser }

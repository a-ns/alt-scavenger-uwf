let mongoose = require('mongoose')
let Schema = mongoose.Schema

let options = { discriminatoryKey: 'kind' }

let userSchema = new Schema(
  {
    uuid: {
        type: String,
        required: true
      },
    name: {
        type: String,
        required: true
      },
    currentLocation: { type: Schema.ObjectId, ref: 'Location' }

  }, options)

let User = mongoose.model('Location', userSchema)

let studentSchema = new Schema(
  {
    visitedLocations: [{ type: Schema.ObjectId, ref: 'Location' }]
  }, options)

let facultySchema = new Schema(
  {
    office: { type: Schema.ObjectId, ref: 'Location' },
    dept: {
        type: String,
        required: true
      },
    desc: {
        type: String,
        required: true
      },
    misc: [String]
  }, options)

let StudentUser = User.discriminator('InsideLocation', studentSchema)

let FacultyUser = User.discriminator('OutsideLocation', facultySchema)

module.exports = { User, StudentUser, FacultyUser }

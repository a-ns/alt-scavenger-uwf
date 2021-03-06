let mongoose = require('mongoose')
let Schema = mongoose.Schema

let options = { discriminatoryKey: 'kind' }

let locationSchema = new Schema(
  {
    uuid: {
        type: String,
        required: true
      },
    desc: {
        type: String,
        required: true
      },
    building: {
        type: String,
        required: true
      },
  }, options)

let Location = mongoose.model('Location', locationSchema)

let insideLocationSchema = new Schema(
  {
    room: {
        type: String,
        required: true
      },
  }, options)

let InsideLocation = Location.discriminator('InsideLocation', insideLocationSchema)

let outsideLocationSchema = new Schema({}, options)
let OutsideLocation = Location.discriminator('OutsideLocation', outsideLocationSchema)

module.exports = { Location, InsideLocation, OutsideLocation }

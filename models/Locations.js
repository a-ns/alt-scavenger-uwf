let mongoose = require('mongoose')
let Schema = mongoose.Schema

let options = { discrimnatoryKey: 'kind' }

let locationSchema = new Schema(
  {
    uuid: String,
    desc: String,
    building: String,
  }, options)

let Location = mongoose.model('Location', locationSchema)

let insideLocationSchema = new Schema(
  {
    room: String,
  }, options)

let InsideLocation = Location.discriminator('InsideLocation', insideLocationSchema)

let OutsideLocation = Location.discriminator('OutsideLocation', {})

module.exports = { Location , InsideLocation, OutsideLocation}

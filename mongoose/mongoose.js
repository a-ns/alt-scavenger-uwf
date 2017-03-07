let mongoose = require('mongoose')
try {
  mongoose.connect(process.env.MONGODB_URI)
}
catch (err) {
  mongoose.createConnection(process.env.MONGODB_URI)
}

module.exports = mongoose

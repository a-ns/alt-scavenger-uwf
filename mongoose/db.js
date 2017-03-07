let db = require('mongoose')
try {
  db.connect(process.env.MONGODB_URI)
}
catch (err) {
  db.createConnection(process.env.MONGODB_URI)
}

module.exports = db

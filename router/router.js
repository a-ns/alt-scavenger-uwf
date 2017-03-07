let express = require('express')
let router = express.Router()
let routes = require('./routeHandlers.js')

router.use(function (req, res, next) {
  console.log('This needs to do logging stuff')
  next()
})

router.get('/', routes.getApiDefault)
router.route('/scobjects')
      .post(routes.scobjectsPost)
      .get(routes.scobjectsGet)

module.exports = router

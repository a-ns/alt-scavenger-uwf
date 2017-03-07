let express = require('express')
let router = express.Router()
let routes = require('./routeHandlers.js')

router.use(function (req, res, next) {
  //stuff here maybe
  next()
})

router.get('/', routes.getApiDefault)
router.route('/scobjects')
      .post(routes.scobjectsPost)
      .get(routes.scobjectsGet)

module.exports = router

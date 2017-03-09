let express = require('express')
let router = express.Router()
let routes = require('./routeHandlers.js')

router.use(function (req, res, next) {
  //stuff here maybe
  next()
})

router.get('/', routes.apiGet)

router.route('/locations')
      .get(routes.locationsGet)

router.route('/locations/inside')
      .post(routes.insideLocationsPost)
      .get(routes.insideLocationsGet)



router.route('/locations/outside')
      .post(routes.outsideLocationsPost)
      .get(routes.outsideLocationsGet)

module.exports = router

let express = require('express')
let router = express.Router()
let routes = require('./routeHandlers.js')

router.use(function (req, res, next) {
  //  logging stuff can go here
  next()
})

router.get('/', routes.apiGet)

router.route('/locations')
      .get(routes.locationsGet)
      .post(routes.locationsPost)
      .put(routes.locationsPut)
      .delete(routes.locationsDelete)

router.route('/locations/inside')
      .post(routes.insideLocationsPost)
      .get(routes.insideLocationsGet)
      .put(function (req, res, next) { res.status(501).send('Not implemented') })
      .delete(function (req, res, next) { res.status(501).send('Not implemented') })

router.route('/locations/outside')
      .post(routes.outsideLocationsPost)
      .get(routes.outsideLocationsGet)
      .put(function (req, res, next) { res.status(501).send('Not implemented') })
      .delete(function (req, res, next) { res.status(501).send('Not implemented') })

router.route('/locations/outside/:uuid')
      .get(routes.specificOutsideLocationGet)
      .post(function (req, res, next) { res.status(501).send('Not implemented') })
      .put(function (req, res, next) { res.status(501).send('Not implemented') })
      .delete(function (req, res, next) { res.status(501).send('Not implemented') })

module.exports = router

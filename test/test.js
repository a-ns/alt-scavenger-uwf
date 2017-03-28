var chai = require('chai')
var chaiHttp = require('chai-http')
var routeHandlers = require('../router/routeHandlers.js')
var should = chai.should()
var server = require('../server.js')
chai.use(chaiHttp)

describe('Route Handlers', function () {

  it('GET on /api should return hello message', function (done){
    chai.request(server)
        .get('/api')
        .end(function(err, res) {
          res.should.have.status(200)
          done()
        })
  })

  it('GET on /api/locations should return array of objects', function (done) {
    chai.request(server)
        .get('/api/locations')
        .end(function(err, res) {
          res.body.should.be.a('array')
          done()
        })
  })

  it('GET on /api/locations/inside should return array of objects', function (done) {
    chai.request(server)
        .get('/api/locations/inside')
        .end(function(err, res) {
          res.body.should.be.a('array')
          done()
        })
  })

  it('GET on /api/locations/outside should return array of objects', function (done) {
    chai.request(server)
        .get('/api/locations/outside')
        .end(function(err, res) {
          res.body.should.be.a('array')
          done()
        })
  })

  it('POST on /api/locations should return error 400', function (done) {
    chai.request(server)
        .post('/api/locations')
        .end(function(err, res) {
          res.should.have.status(400)
          done()
        })
  })

  it('GET on /api/locations/outside/:id should return inside location object or not found', function (done) {
    chai.request(server)
        .get('/api/locations/outside/12345678')
        .end(function(err, res) {
          res.should.satisfy(function(res) {
            console.log(res.statusCode)
              if (res.statusCode == 404 || res.body != null)
                return true
              else return false
          })

          done()
        })
  })

})

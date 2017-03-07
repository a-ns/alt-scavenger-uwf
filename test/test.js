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

  it('GET on /api/scobjects should return array of objects', function (done) {
    chai.request(server)
        .get('/api/scobjects')
        .end(function(err, res) {
          res.should.have.status(200)
          done()
        })
  })

})

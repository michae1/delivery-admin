'use strict';

var hippie = require('hippie'),
  server = require('../../app'),
  demoData = require("../../demoData");

describe('Server', function () {

  describe('/orders endpoint', function () {

    it('returns orders list', function (done) {
        hippie(server)
            .json()
            .get('/orders')
            .expectStatus(200)
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
    });

    it('can drop order', function (done) {
        hippie(server)
            .json()
            .del('/orders/001')
            .expectStatus(204)
            .end(function(err, res, body) {
                if (demoData.getOrders().some(function(o){return o.orderId=='001'}))
                    throw "Order was not dropped"


                if (err) throw err;
                    done();
            });
    });

  });

});
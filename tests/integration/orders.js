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

    it('returns orders list filtered by companyName', function (done) {
        hippie(server)
            .json()
            .get('/orders?companyName=SuperTrader')
            .expectBody([
                { orderId: '001',
                  companyName: 'SuperTrader',
                  customerAdress: 'Steindamm 80',
                  orderedItem: 'Macbook' },
                { orderId: '004',
                  companyName: 'SuperTrader',
                  customerAdress: 'Sternstrasse 125',
                  orderedItem: 'Book "Cooking 101"' },
                { orderId: '005',
                  companyName: 'SuperTrader',
                  customerAdress: 'Ottenser Hauptstrasse 24',
                  orderedItem: 'Inline Skates' },
                { orderId: '008',
                  companyName: 'SuperTrader',
                  customerAdress: 'Reeperbahn 153',
                  orderedItem: 'Inline Skates' }
                ] 
                )
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
    });

    it('returns orders list filtered by customerAdress', function (done) {
        hippie(server)
            .json()
            .get('/orders?customerAdress=Reeperbahn 153')
            .expectBody(
                [{"orderId":"002","companyName":"Cheapskates","customerAdress":"Reeperbahn 153","orderedItem":"Macbook"},{"orderId":"006","companyName":"MegaCorp","customerAdress":"Reeperbahn 153","orderedItem":"Playstation"},{"orderId":"008","companyName":"SuperTrader","customerAdress":"Reeperbahn 153","orderedItem":"Inline Skates"}]
                )
            .end(function(err, res, body) {
                if (err) throw err;
                done();
            });
    });

    it('returns stats', function (done) {
        hippie(server)
            .json()
            .get('/orders/stats')
            .expectStatus(200)
            .expectBody(
                [{"Macbook":2},{"Inline Skates":2},{"Book \"Guide to Hamburg\"":1},{"Book \"Cooking 101\"":1},{"Playstation":1},{"Flux compensator":1}]
                )
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
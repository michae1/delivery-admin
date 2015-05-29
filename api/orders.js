'use strict';

var data = require("../demoData"),
    u = require("./utils");

module.exports = function (server) {
    server.get('/orders', function(req, res, next) {
        if (req.query.companyName){
            res.send(data.getOrdersByKey("companyName", req.query.companyName));
        } else if(req.query.customerAdress){
            res.send(data.getOrdersByKey("customerAdress", req.query.customerAdress));
        } else {
            res.send(data.getOrders());
        }
        return next();
    });

    server.get('/orders/stats', function(req, res, next) {
        res.send(data.getStats());
        return next();
    });

    server.del('orders/:order_id', function rm(req, res, next) {
        // TODO: index for order list should be built once on data load
        data.deleteOrder(req.params.order_id);
        res.send(204);
        return next();
    });
}
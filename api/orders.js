'use strict';

var data = require("../demoData"),
    u = require("./utils");

module.exports = function (server) {
    server.get('/orders', function(req, res, next) {
        // TODO: ordersMapper should be called once on data load
        if (req.query.companyName){
            // filtering
            // return
        }

        res.send(data.getOrders());
        return next();
    });
    server.del('orders/:order_id', function rm(req, res, next) {
        // TODO: index for order list should be built once on data load
        data.deleteOrder(req.params.order_id);
        res.send(204);
        return next();
    });
}
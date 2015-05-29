'use strict';

var u = require("./api/utils");

var _orders = [
        ["001", "SuperTrader", "Steindamm 80", "Macbook"],
        ["002", "Cheapskates", "Reeperbahn 153", "Macbook"],
        ["003", "MegaCorp", "Steindamm 80", "Book \"Guide to Hamburg\""],
        ["004", "SuperTrader", "Sternstrasse 125", "Book \"Cooking 101\""],
        ["005", "SuperTrader", "Ottenser Hauptstrasse 24", "Inline Skates"],
        ["006", "MegaCorp", "Reeperbahn 153", "Playstation"],
        ["007", "Cheapskates", "Lagerstrasse 11", "Flux compensator"],
        ["008", "SuperTrader", "Reeperbahn 153", "Inline Skates"]
    ];

function Orders( args ) {}

Orders.prototype = {
    orders: [],

    checkOrders: function(){
        if (this.orders.length === 0)
            // initial convertation
            this.orders = u.ordersMapper(_orders);
    },

    getOrders: function(){
        this.checkOrders();
            // initial convertation
        return this.orders;
    },

    deleteOrder: function(id){
        var _this = this;
        _this.orders.forEach(function(o, i){
            if (o.orderId == id)
                _this.orders.splice(i,1);
        });
    }        
    
};

var ordersObj = new Orders();

exports.getOrders = function( ) {
    return ordersObj.getOrders( );
};

exports.deleteOrder = function( id ) {
    return ordersObj.deleteOrder( id );
};


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
    indexes: {},
    indexableFields: ["orderId","companyName", "customerAdress"],
    statsData: {},
    buildIndex: function(){
        var _this = this;
        _this.indexableFields.forEach(function(key){

            _this.indexes[key] = {};
            _this.orders.forEach(function(o, i){
                if (!_this.indexes[key][o[key]])
                    _this.indexes[key][o[key]] = [i];
                else
                    _this.indexes[key][o[key]].push(i);
            });

        });
        
    },

    buildStats: function(){
        var _this = this;
            _this.statsData = {};
            _this.orders.forEach(function(o, i){
                if (!_this.statsData[o.orderedItem])
                    _this.statsData[o.orderedItem] = 1;
                else
                    _this.statsData[o.orderedItem] += 1;
            });
        
    },

    checkOrders: function(){
        if (this.orders.length === 0)
            // initial convertation
            this.orders = u.ordersMapper(_orders);
            this.buildIndex();
            this.buildStats();
    },

    getOrders: function(){
        this.checkOrders();
        return this.orders;
    },

    getOrdersByKey: function(key, value){
        var _this = this;
        _this.checkOrders();
        var arrIndexes = _this.indexes && _this.indexes[key] && _this.indexes[key][value] || [];
        return arrIndexes.map(function(i){return _this.orders[i];});
    },

    getStats: function(){
        this.checkOrders();
        var sortable = [];
        
        for (var product in this.statsData){
            var obj = {};
            obj[product] = this.statsData[product];
            sortable.push(obj);
        }
        return sortable.sort(function(a,b){return b[Object.keys(b)[0]]-a[Object.keys(a)[0]];});
    },

    deleteOrder: function(id){
        var _this = this;
        _this.orders.forEach(function(o, i){
            if (o.orderId == id)
                _this.orders.splice(i,1);
        });
        // rebuild index
        this.buildIndex();
        this.buildStats();

    }        
    
};

var ordersObj = new Orders();

exports.getOrders = function( ) {
    return ordersObj.getOrders( );
};

exports.getStats = function( ) {
    return ordersObj.getStats( );
};

exports.getOrdersByKey = function( key, value ) {
    return ordersObj.getOrdersByKey( key, value );
};

exports.deleteOrder = function( id ) {
    return ordersObj.deleteOrder( id );
};


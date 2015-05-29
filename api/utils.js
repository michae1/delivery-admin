'use strict';

module.exports = {
    ordersMapper: function(ordersList){
        var mapped = ordersList.map(function(o){
            return {
                orderId: o[0], 
                companyName: o[1], 
                customerAdress: o[2], 
                orderedItem: o[3]
            }
        });
        return mapped;
    }
}
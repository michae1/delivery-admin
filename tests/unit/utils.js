// test/string.js
var expect = require('chai').expect,
    u = require("../../api/utils");

describe('Api', function () {
    describe('utils', function () {
        it('Map data array into object', function () {
            var data = ["001", "SuperTrader", "Steindamm 80", "Macbook"],
            obj = u.ordersMapper([data]),
            original = { orderId: '001',
                    companyName: 'SuperTrader',
                    customerAdress: 'Steindamm 80',
                    orderedItem: 'Macbook' };

            expect(obj[0]).to.deep.equal(original);
        });
    });
});
    
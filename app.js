'use strict';

var restify = require('restify');  

var server = restify.createServer({ 'name': 'api' });
server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(restify.queryParser());

require('./api/orders')(server);



server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});


// for tests
module.exports = server;
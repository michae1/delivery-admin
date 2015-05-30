# Delivery admin API #

Api to manage orders delivery.

### Set up ###

* Clone with `git clone https://bitbucket.org/michae1/delivery-admin.git`

* This project requires node.js installed on your system. For example, on ubuntu you can run
`sudo apt-get install nodejs`

* Note that it can also require separate npm install 
`sudo apt-get install npm`

* Install grunt globally
`sudo npm install -g grunt`

* Install project packages
`npm install`

### Run project ###

* With grunt (useful for development)
`grunt`
* With node (to run on server etc)
`node app.js`

### Usage ###
This project is just backend API to make it possible to work with web frontend and mobile. So you can test it with simple curl

* To get full orders list:

`curl -X GET http://localhost:3000/orders`

* To get orders list filtered by companyName:

`curl -X GET http://localhost:3000/orders?companyName=SuperTrader`

* To get orders list filtered by customerAdress:

`curl -X GET http://localhost:3000/orders?customerAdress=Reeperbahn 153`

* To get orders stats:

`curl -X GET http://localhost:3000/orders/stats`

* To delete orders by orderId:

`curl -X DELETE localhost:3000/orders/001`

### Tests ###

* To run unit and integration tests:
`grunt test`
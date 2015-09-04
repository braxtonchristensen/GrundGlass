var EmailService = require('../services/EmailService');


module.exports = {
	sendEmail: function(req, res){
		EmailService.sendEmail(req).then(function(data){
			res.send(data);
		});
	},

	sendReceipt: function(data){
		var email = {
				"body":"This message is to confirm that your order has been submitted, and payment has been recieved. Your order confirmation number is " + data._id +".",
				"subject":"Grundeglass Order Confirmation Number",
				"from_email":"hello@grundeglass.com",
				"from_name":"Brent",
				"to":[{
					"email": data.customer.email,
					"name": data.customer.name,
					"type":"to"
			}]
		};
		EmailService.sendEmail(email).then(function(response){
			res.send(response);
		});
	},

	sendOrder: function(data){
		var email = {
				"body":"Brent, you have a new order.  http://localhost:9003/#/admin/orders.  The order id is: " + data._id +".",
				"subject":"GrundeGlass Order Confirmation Number",
				"from_email":"hello@grundeglass.com",
				"from_name":"Your Friendly Reminder Service",
				"to":[{
					"email": 'braxton.christensen@gmail.com',
					"name": 'Braxton',
					"type":"to"
			}]
		};
		EmailService.sendEmail(email).then(function(response){
			res.send(response);
		});
	}
};
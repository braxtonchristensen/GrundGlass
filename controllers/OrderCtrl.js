var Order = require('../models/OrderModel.js');
var Customer = require('../models/CustomerModel.js');

module.exports = {

	create: function(req, res){
		new Order(req.body)
		.save(function(err, data){
			if(err){
				console.log(err);
				res.status(500).send(err);
			} else {
				// if(data.customer)
				// Customer.findByIdAndUpdate(data.customer, 
				// 	{ $push: { 'orders': data._id }},
				// 	{ safe: true, upsert: true}, function(err){
				// 		if(err){
				// 			res.error(500).send(err)
				// 		}
				// 	});
				res.send(data);

			}
		});
	},

	get: function(req, res){
		Order.find(req.query)
		.populate('products.product')
		.populate('products.photo')
		.exec(function(err, data){
			if(err){
				res.error(500).send(err);
			} else {
				res.send(data);
			}
		});
	},

	update: function(req, res){
		Order.findByIdAndUpdate(req.query._id, req.body, function(err, data){
			if(err){
				res.status(500).send(err);
				console.log(err);
			} else {
				res.send(data);
			}
		});
	}
};
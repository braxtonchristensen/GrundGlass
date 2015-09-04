var mongoose = require('mongoose');

var ProductSchema = mongoose.Schema({

	title: { type: String, maxlength: 40 },
	description: { type: String, maxlength: 140 },
	image: { type: String },
	price: { type: Number, minimum: 0, required: true },
	category: { type: String, enum: ['Dry Pipes', 'Water Pipes', 'Oil Rigs', 'Rig Accessories', 'Dabbers', 'Pendants']},
	dateCreated: { type: Date, default: Date.now },
	dateUpdated: { type: Date, default: Date.now }
});

ProductSchema.pre('update', function() {
  	this.dateUpdated = Date.now();
});

module.exports = mongoose.model('Product', ProductSchema);
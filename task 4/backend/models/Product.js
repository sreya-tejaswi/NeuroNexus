const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, "Name is required." ]
	},
	description: {
		type: String,
		required: [ true, "Description is required." ]
	},
	price: {
		type: Number,
		required: [ true, "Price is required."]
	},
	isActive: {
		type: Boolean,
		default: true
	},
	createdOn: {
		type: Date,
		default: new Date()
	},
	customers : [
		{
			userId : {
				type: String,
				required: [ true, "UserId is required."]
			},

			orderedOn: {
				type: Date,
				default: new Date()
			}
		}
	]
})

module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const COLLECTION_NAME = "Restaurants";
const RestaurantSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter restaurant name"],
		trim: true
	},
	cuisine: {
		type: String,
		required: true
	},
	city: {
		type: String
	},
	restaurant_id: {
		type: String
	},
	address: {
		building: {
			type: String,
			required: true
		},
		street: {
			type: String,
			required: true
		},
		zipcode: {
			type: String,
			required: false
		}
	}
});

// Helpers

// Question 5
RestaurantSchema.statics.findByCuisine = function(cuisineName) {
	return this.find({ cuisine: cuisineName }).select("name cuisine");
}

// Question 7
RestaurantSchema.statics.findDelisNotInBrooklyn = function() {
	return this.find({ cuisine: "Delicatessen", city: {$ne: "Brooklyn"} });
}

// Question 6
RestaurantSchema.query.sortById = function(sortByFlag) {
	return this.sort({ restaurant_id: sortByFlag });
}

// Question 7
RestaurantSchema.query.sortedByNameAsc = function() {
	return this.sort({ name: 1 });
}

const Restaurant = mongoose.model("Restaurant", RestaurantSchema, COLLECTION_NAME);
module.exports = Restaurant;

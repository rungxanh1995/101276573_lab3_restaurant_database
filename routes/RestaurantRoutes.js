const express = require("express");
const restaurantModel = require("../models/Restaurant");
const app = express();

async function getAllRestaurants(res) {
	const restaurants = await restaurantModel.find({});
	try {
		res.status(200).send(restaurants);
	} catch (err) {
		res.status(500).send(err);
	}
}

async function getAllRestaurantsSorted(req, res) {
	const sortByFlag = (req.query.sortBy.toLowerCase() === "asc") ? 1 : -1;
	const restaurants = await restaurantModel
		.find({})
		.sortById(sortByFlag)
		.select("name city cuisine restaurant_id");
	
	try {
		res.status(200).send(restaurants);
	} catch (err) {
		res.status(500).send(err);
	}
}

// Question 6
// Custom Get all restaurants: Sort by Id
// http://localhost:3000/restaurants?sortBy=ASC
// http://localhost:3000/restaurants?sortBy=DESC
app.get("/restaurants", async (req, res) => {
	if (!req.query.sortBy) {
		await getAllRestaurants(res);
	} else {
		await getAllRestaurantsSorted(req, res);
	}
});

// Question 4
// Default Get all restaurants
app.get("/restaurants", async (req, res) => {
	await getAllRestaurants(res);
});

// Question 5
app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
	const cuisine = req.params.cuisine;
	const restaurants = await restaurantModel.findByCuisine(cuisine);
	
	try {
		if (restaurants.length !== 0) {
			res.send(restaurants);
		} else {
			res.send(JSON.stringify({status: false, message: "No data found"}))
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

// Question 7
app.get("/restaurants/Delicatessen", async (req, res) => {
	const restaurants = await restaurantModel
		.findDelisNotInBrooklyn()
		.sortedByNameAsc()
		.select("cuisine name city");
	try {
		res.status(200).send(restaurants);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = app;

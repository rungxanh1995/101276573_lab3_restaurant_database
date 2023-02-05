const express = require("express");
const mongoose = require("mongoose");
const restaurantRouter = require("./routes/RestaurantRoutes.js");

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://101276573:1234_5678_abc@cluster0.wed75fp.mongodb.net/comp3133?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(success => {
	console.log('Success Mongodb connection')
}).catch(err => {
	console.log('Error Mongodb connection')
});

app.use(restaurantRouter);

app.listen(3000, () => { console.log('Server is running at localhost:3000...') });

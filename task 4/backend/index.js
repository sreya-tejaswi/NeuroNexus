const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoute.js");
const productRoutes = require("./routes/productRoute.js");
//const orderRoutes = require("./routes/orderRoute.js")
const cors = require("cors");

const app = express();

mongoose.connect("mongodb+srv://admin:admin@zuitt-bootcamp.lzuuwol.mongodb.net/s42-s46",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

mongoose.connection.once("open", () => console.log("Now connected in the cloud."));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.listen(process.env.PORT || 4000, () => {
	console.log(`API is now online on port ${process.env.PORT || 4000}`)
});

app.use("/users", userRoutes);
app.use("/products", productRoutes);
//app.use("/orders", orderRoutes);
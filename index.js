
// Creating the server 
require('dotenv').config();
const mongoose = require('mongoose');
const express = require("express");
const router = require("./routes.js");
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

// Creating the app
app = express();
app.use(express.json());
app.use('/api', router);

// Visualization of the images of the advertisements
app.get('/images/addvertisements/:img', async (req, res, next) => {
	const img = req.params.img
	res.sendFile(`${__dirname}/pictures/addvertisements/${img}`);
});

// I am initializing the server 
app.listen(3000, () => {
    console.log('Server Started at ${3000}')
});

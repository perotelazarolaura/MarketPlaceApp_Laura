require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs');
const Addvert = require("./models/item.js")

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});

// To read the JSON using file sistem as we have to get the json from a file
const data = JSON.parse(fs.readFileSync('./mongoose/adverts.json'));

//We create an add model and export it
Addvert.create(data)

// Create the add model
const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    sale :{
        type:Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    }
});

//We create an add model and export it
const Addvert = mongoose.model('adds', itemSchema)
module.exports = Addvert
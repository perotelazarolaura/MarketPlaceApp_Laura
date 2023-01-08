require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs');
const readline = require('readline');
const Addvert = require("../models/item.js")

const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Are you sure yo want to make changes to the database? y/n: ", async(answer) => {  
    if(answer ==="y"){
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
    
        // To read the JSON using file sistem as we have to get the json from a file
        const data = JSON.parse(fs.readFileSync('./mongoose/adverts.json'));
    
        //We create an add model and export it
        await Addvert.create(data)
    }  
    rl.close();
});

rl.on('close', () => process.exit(0));
const mongoose = require('mongoose');

const URL = "mongodb://127.0.0.1:27017/MealWay"

const connectionDB = async () => {
    try {
        await mongoose.connect(URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
        process.exit(0);
        
    }
};

module.exports = connectionDB;

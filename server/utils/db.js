const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGO_URI

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

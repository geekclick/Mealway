const mongoose = require('mongoose');
require('dotenv').config();

<<<<<<< HEAD
const  URL = "mongodb://127.0.0.1:27017/MealWay";
=======
const URL = process.env.MONGO_URI
>>>>>>> a9d46776db0ad957885f04c1b980be5dd4196b3b

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

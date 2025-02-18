const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    profile_pic: {
        type: String
    },
    dob: {
        type: Date
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'vendor'],
        default: 'user'
    }
}, {
    timestamps: true
});

// Hashing a Password
userModel.pre('save', async function (next) {
    const user = this;
    console.log(user.isModified('password'));

    if (!user.isModified('password')) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, salt);
        user.password = hash_password;
        console.log(hash_password);
    } catch (error) {
        next(error);

    }
})

// Creating a JWT token
const key = process.env.JWT_KEY
userModel.methods.generateToken = async function () {
    try {

        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            "thibjbwebf",
            {
                expiresIn: "30d",
            }
        );

    } catch (error) {
        console.log("Generate Web token error : \n", error);
    }
}


userModel.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
};
const User = mongoose.model('User', userModel);

module.exports = User;




// // Comapring the new password with hash_password
// // userSchema.methods.comparePassword = async function (newpass) {
// //     try {
// //         return await bcrypt.compare(newpass, this.password);
// //     } catch (error) {
// //         console.log(error, "Indicating password checker");

// //     }
// // }
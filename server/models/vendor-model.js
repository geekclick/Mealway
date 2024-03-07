const mongoose = require('mongoose');
const schema = mongoose.Schema;

const VendorSchema = new mongoose.Schema({
    img: {
        type: String,
        required: false
    },
    coverImg: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    shopname: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: false
        },
        coordinates: {
            type: [Number],
            required: false
        }
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    ratings: {
        type: Number,
        default: 0,
        required: false
    },
    reviews: [
        {
            type: String,
            required: false

        }
    ],
    openCloseHours: {
        type: Map,
        of: String,
        required: false

    },
    menu: [{
        dishName: String,
        price: Number,
        description: String,
    }]
});

VendorSchema.index({ location: "2dsphere" });

const Vendor = new mongoose.model("Vendor", VendorSchema);

module.exports = Vendor;
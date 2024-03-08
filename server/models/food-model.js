const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Street Food', 'Fast Food', 'Snacks', 'Desserts', 'Beverages'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor', // Assuming you have a Vendor model for the food vendor
    required: false
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String, // URL of the image
    required: false
  },
  rating: {
    type: Number,
    default: 0
  },
//   reviews: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Review' // Assuming you have a Review model for food reviews
//   }],
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;

const mongoose = require('mongoose');

const foodModel = new mongoose.Schema({
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: ['veg', 'non-veg', 'dessert', 'beverage'],
    required: true
  },
  price: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Food', foodModel);































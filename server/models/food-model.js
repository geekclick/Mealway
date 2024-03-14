// menuItemModel.js

const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
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
    enum:['veg','non veg','fast food','bevrage','desert','chinese'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Food', menuItemSchema);
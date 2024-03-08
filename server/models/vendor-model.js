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
      // enum: ['Street Food', 'Fast Food', 'Snacks', 'Desserts', 'Beverages'],
      required: false
    },
    price: {
      type: Number,
      required: true
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId, // Reference to Vendor model
      ref: 'Vendor', // Indicates that this field references the Vendor model
      required: false
    },
    image: {
      type: String, // URL of the image
      required: false
    },
    rating: {
      type: Number,
      default: 0
    },
});

const vendorSchema = new mongoose.Schema({
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
    required: true,
    trim: true
 },
 shopname: {
    type: String,
    required: true,
    trim: true
 },
 location: {
    type: {
      type: String,
      enum: ['Point'],
      required: false
    },
    coordinates: {
      type: [Number],
      required: false,
      index: '2dsphere'
    }
 },

 address:{
   type: String,
   required: true
 },
 description: {
    type: String,
    trim: true
 },
 menu: {
    type: [menuItemSchema],
    required: true
 },
 contact: {
    type:Number,
    required: true
 },
 openingHours: {
    type: String,
    // of: String,
    required: false
 }
}
);
vendorSchema.index({ 'menu.name': 'text' });
// Create a 2dsphere index for the location field
vendorSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Vendor', vendorSchema);
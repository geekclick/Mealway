const mongoose = require('mongoose');

const FavouriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true
  },
  vendors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vendor', // Reference the Vendor model (assuming 'Vendor' model exists)
      required: true
    }
  ]
});

module.exports = mongoose.model('Favourite', FavouriteSchema);

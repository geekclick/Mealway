const mongoose = require('mongoose');

const favouriteModel = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  food_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
    required: false
  },
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: false
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate favorites
favouriteModel.index({ user_id: 1, food_id: 1, shop_id: 1 }, { unique: true });

module.exports = mongoose.model('Favourite', favouriteModel);
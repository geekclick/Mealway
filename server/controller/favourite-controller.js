const Favourite = require('../models/favourite-model');

exports.addShopToFavourites = async (req, res) => {
  try {
    const { user_id, shop_id } = req.body;

    if (!user_id || !shop_id) {
      return res.status(400).json({ message: "User ID and Shop ID are required." });
    }

    const existingFavourite = await Favourite.findOne({ user_id, shop_id });

    if (existingFavourite) {
      return res.status(400).json({ message: "Shop already added to favourites." });
    }

    const favourite = new Favourite({ user_id, shop_id });
    await favourite.save();

    const populatedFavourite = await Favourite.findById(favourite._id).populate('shop_id');

    res.status(201).json({ message: "Shop added to favourites.", favourite: populatedFavourite });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.removeShopFromFavourite = async (req, res) => {
  try {
    const { user_id, shop_id } = req.body;

    if (!user_id || !shop_id) {
      return res.status(400).json({ message: "User ID and Shop ID are required." });
    }

    const existingFavourite = await Favourite.findOneAndDelete({ user_id, shop_id });

    if (!existingFavourite) {
      // return res.status(400).json({ message: "Shop does not exist in the favourite "});
      console.log("Shop does not exist in the favourite");
    }


    res.status(200).json({ message: "Shop removed from favourites.", Favourite });

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}

// Add Food to Favourites
exports.addFoodToFavourites = async (req, res) => {
  try {
    const { user_id, food_id } = req.body;

    if (!user_id || !food_id) {
      return res.status(400).json({ message: "User ID and Food ID are required." });
    }

    const existingFavourite = await Favourite.findOne({ user_id, food_id });

    if (existingFavourite) {
      return res.status(400).json({ message: "Food item already added to favourites." });
    }

    const favourite = new Favourite({ user_id, food_id });
    await favourite.save();

    const populatedFavourite = await Favourite.findById(favourite._id).populate('food_id');

    res.status(201).json({ message: "Food added to favourites.", favourite: populatedFavourite });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

exports.getFavourites = async (req, res) => {
  try {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ message: "Bad Request: user_id is required." });
    }

    const favourites = await Favourite.find({ user_id })
      .populate('shop_id')
      .populate('food_id');
    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
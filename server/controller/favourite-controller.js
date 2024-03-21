const Favourite = require('../models/favouriteSchema');
const Vendor = require('../models/vendor-model');
const Food = require('../models/food-model');

//------------------------ addVendorToFavorites -----------------------------//

const addVendorToFavorites = async (req, res) => {
  // const { vendorId } = req.params;
  const { vendorId } = req.body;
  console.log("Received vendor ID:", vendorId);

  const { userId } = req.body;

  try {

    console.log("Received request to add vendor:", vendorId, "to favorites for user:", userId);

    // Find or create the favorite record for the user.
    let favorite = await Favourite.findOne({ user: userId });

    if (!favorite) {

      console.warn("Creating favorite without initial vendor. Consider validation logic.");
      favorite = new Favourite({
        user: userId,
        vendors: [] // Empty array to satisfy validation
      });
    } else {
      console.log("vendor already exists");// Check if the vendor already exists in the user's favorites
      if (!favorite.vendors.includes(vendorId)) {
        favorite.vendors.push(vendorId);
      }
    }

    // Save the changes to the favorite record
    await favorite.save();
    console.log("Ids of the favorite vendors", favorite.vendors);

    // Populate the vendor details in the favorite record
    favorite = await Favourite.findById(favorite._id).populate('vendors');

    // If you want to return only the added vendor details, you can use:
    // const addedVendor = await Vendor.findById(vendorId);

    // Return the updated favorite list with vendor details
    res.status(200).json(favorite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error: ' + err.message });
  }
};

//-------------------------- removeVendorFromFavorites -----------------------------//
const removeVendorFromFavorites = async (req, res) => {
  const { vendorId } = req.body; // Assuming vendorId is in request body
  const { userId } = req.body;

  try {
    console.log("Received request to remove vendor:", vendorId, "from favorites for user:", userId);

    const favorite = await Favourite.findOne({ user: userId });

    if (!favorite) {
      return res.status(404).json({ error: 'Favorites not found for user' });
    }

    const vendorIndex = favorite.vendors.indexOf(vendorId);

    if (vendorIndex === -1) {
      return res.status(404).json({ error: 'Vendor not found in favorites' });
    }

    favorite.vendors.splice(vendorIndex, 1);

    await favorite.save();

    // Populate the updated vendor list
    let favourite = await Favourite.findById(favorite._id).populate('vendors');

    res.status(200).json(favourite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error: ' + err.message });
  }
};

//-------------------------- addFoodToFavorites -----------------------------//

const addFoodToFavorites = async (req, res) => {
  const { foodId } = req.body; // Assuming food ID is in request body
  const { userId } = req.body;

  try {
    console.log("Received request to add food:", foodId, "to favorites for user:", userId);

    // Find or create the favorite record for the user
    let favorite = await Favourite.findOne({ user: userId });

    // Handle case where favorite doesn't exist yet
    if (!favorite || !favorite.foods) {
      console.warn("Creating favorite without initial food. Consider validation logic.");
      favorite = new Favourite({
        user: userId,
        foods: [] // Empty array to satisfy validation
      });
    } else {
      // Existing favorite with foods array
      console.log("Food section already exists");
      if (!favorite.foods.includes(foodId)) {
        favorite.foods.push(foodId);
      }
    }

    // Save the changes to the favorite record
    await favorite.save();


    // favorite = await Favourite.findById(favorite._id).populate('foods');
    favorite = await Favourite.findById(favorite._id).populate('foods');

    // Return the favorite object with populated food details
    res.status(200).json(favorite);


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error: ' + err.message });
  }
};

//-------------------------- removeFoodFromFavorites -----------------------------//

const removeFoodFromFavorites = async (req, res) => {
  const { foodId, userId } = req.body;

  try {
    const favorite = await Favourite.findOneAndUpdate(
      { user: userId },
      { $pull: { foods: foodId } },
      { new: true }
    );

    if (!favorite) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    res.status(200).json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { addVendorToFavorites, removeVendorFromFavorites, addFoodToFavorites, removeFoodFromFavorites };

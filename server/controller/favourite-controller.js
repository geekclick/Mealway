const Favourite = require('../models/favouriteSchema');
const Vendor = require('../models/vendor-model');

const addVendorToFavorites = async (req, res) => {
  // const { vendorId } = req.params;
  const { vendorId } = req.body;
  console.log("Received vendor ID:", vendorId);

  const { userId } = req.body;

  try {

    console.log("Received request to add vendor:", vendorId, "to favorites for user:", userId);


    // Find or create the favorite record for the user
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



module.exports = { addVendorToFavorites };

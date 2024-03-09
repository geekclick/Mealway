const express = require('express');
const router = express.Router();
const foodForm = require('../controller/food-controller');
const favouriteForm = require('../controller/favourite-controller');

router.route('/addFood').post(foodForm.addfood);
router.route("/getAllFoods").get(foodForm.getAllFoods );
router.route("/deleteFood").delete(foodForm.deleteSelectedFood );
router.route("/updateFood").post(foodForm.updateSelectedFood );

router.route("/addVendortoF").post(favouriteForm.addVendorToFavorites);
router.route("/removeVendortoF").post(favouriteForm.removeVendorFromFavorites);
router.route("/addFoodtoF").post(favouriteForm.addFoodToFavorites);


module.exports = router;

const express = require('express');
const router = express.Router();

const favouriteForm = require('../controller/favourite-controller');

router.route("/addShopToFavourite").post(favouriteForm.addShopToFavourites);
router.route("/addFoodToFavourite").post(favouriteForm.addFoodToFavourites);
router.route("/getFavourite").get(favouriteForm.getFavourites);
router.route("/removeShopFromFavourite").delete(favouriteForm.removeShopFromFavourite);

module.exports = router;
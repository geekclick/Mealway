const express = require('express');
const router = express.Router();
const foodForm = require('../controller/food-controller');

//----------------------- Food --------------------------//

router.route('/addFood').post(foodForm.addfood);
router.route("/getAllFoods").get(foodForm.getAllFoods );
router.route("/deleteFood").delete(foodForm.deleteSelectedFood );
router.route("/updateFood").post(foodForm.updateSelectedFood );
router.route("/getFoodByCategory/:category").get(foodForm.getFoodByCategory);
router.route("/getFoodByFoodId/:id").get(foodForm.getFoodByFoodId);

//----------------------- Favourite --------------------------//


module.exports = router;

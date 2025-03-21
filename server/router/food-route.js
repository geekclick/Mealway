const express = require('express');
const router = express.Router();
const foodForm = require('../controller/food-controller');

//----------------------- Food --------------------------//

router.route('/addFood').post(foodForm.addfood);
router.route("/getAllFoods").get(foodForm.getAllFoods );
router.route("/deleteFood").delete(foodForm.deleteSelectedFood );
router.route("/updateFood").post(foodForm.updateSelectedFood );

//----------------------- Favourite --------------------------//


module.exports = router;

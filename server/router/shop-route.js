const express = require('express');
const router = express.Router();
const vendorForm = require('../controller/shop-controller');


router.route('/register-shop').post(vendorForm.addShop);
router.route('/addmenu').post(vendorForm.addMenu)
router.route('/deleteMenu').post(vendorForm.deleteMenu);
router.route('/pushMenuId').post(vendorForm.pushMenuId);

router.route("/getAllVendors").get(vendorForm.getAllVendors);
router.route("/deleteVendor").delete(vendorForm.deleteSelectedVendor);
router.route("/updateVendor").post(vendorForm.updateSelectedVendor);

router.route('/searchVendorbyFoodName').post(vendorForm.findVendorByFoodName);
router.route('/getRandomFood').get(vendorForm.getRandomFood);

router.route('/searchVendorById').get(vendorForm.findVendorById);
router.route('/searchVendorByShop').get(vendorForm.findVendorsByShopName);



module.exports = router;

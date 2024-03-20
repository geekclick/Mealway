const express = require('express');
const router = express.Router();
const adminForm = require('../controller/admin-controller');


router.route('/A-register-shop').post(adminForm.addVendor);
router.route("/A-getAllVendors").get(adminForm.getAllVendors );
router.route("/A-deleteVendor").delete(adminForm.deleteSelectedVendor );
router.route("/A-updateVendor").post(adminForm.updateSelectedVendor );


router.route('/A-searchVendor').post(adminForm.getVendorsByFood);
router.route('/A-searchVendorByShop').get(adminForm.findVendorsByShopName);
router.route('/A-searchVendorById').get(adminForm.findVendorById);
router.route('/A-getRandomFood').get(adminForm.getRandomFood);


router.route('/A-getVendorCount').get(adminForm.getVendorCount);
router.route('/A-getMenuCount').get(adminForm.getMenuItemCount);

 
module.exports = router;
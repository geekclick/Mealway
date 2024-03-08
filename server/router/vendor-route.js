const express = require('express');
const router = express.Router();
const vendorForm = require('../controller/vendor-controller');



router.route('/register-shop').post(vendorForm.addVendor);
router.route("/getAllVendors").get(vendorForm.getAllVendors );
router.route("/deleteVendor").delete(vendorForm.deleteSelectedVendor );
router.route("/updateVendor").post(vendorForm.updateSelectedVendor );
router.route('/searchVendor').post(vendorForm.getVendorsByFood);
router.route('/getRandomFood').get(vendorForm.getRandomFood);


module.exports = router;

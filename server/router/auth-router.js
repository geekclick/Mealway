const express = require('express');
const router = express.Router();
const authController = require('../controller/auth-controller');
const validate = require('../middleware/validate-middleware');
const signupSchema = require('../validators/auth-validator');

router.route('/').get(authController.home);
router.route('/login').post(authController.login);
router.route('/register').post(validate(signupSchema), authController.register);

module.exports = router;
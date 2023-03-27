const router = require('express').Router();
const withAuth = require('../../utils/auth');

const { checkoutSession } = require('../../controllers/checkout-controller');


router.route('/').post(withAuth, checkoutSession);


module.exports = router;
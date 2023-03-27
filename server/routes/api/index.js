
const router = require('express').Router();
const userRoutes = require('./user-routes');
const productRoutes = require('./product-routes');
const categoryRoutes = require('./category-routes');
const orderRoutes = require('./order-routes');
const checkoutRoutes = require('./checkout-routes');

router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/order', orderRoutes);
router.use('/checkout', checkoutRoutes);


module.exports = router;

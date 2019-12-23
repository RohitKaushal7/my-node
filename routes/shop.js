const express = require('express')
const shopController = require('../controllers/shop')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/',shopController.getHome)
router.get('/products',shopController.getProducts)
router.get('/products/:productId',shopController.getProductDetail);
router.get('/cart', isAuth, shopController.getCart);
router.post('/cart', isAuth, shopController.postCart);
router.get('/orders', isAuth, shopController.getOrders);
router.get('/checkout', isAuth, shopController.checkout);
router.post('/cart-add', isAuth, shopController.addCart);
router.post('/cart-remove', isAuth, shopController.removeCart);

exports.router = router;
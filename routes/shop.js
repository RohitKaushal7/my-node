const express = require('express')
const shopController = require('../controllers/shop')

const router = express.Router()

router.get('/',shopController.getHome)
router.get('/products',shopController.getProducts)
router.get('/products/:productId',shopController.getProductDetail);
router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.get('/orders',shopController.getOrders);
router.get('/checkout',shopController.checkout);
router.post('/cart-add',shopController.addCart);
router.post('/cart-remove',shopController.removeCart);

exports.router = router;
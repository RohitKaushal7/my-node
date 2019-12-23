const express = require('express')

const adminController = require('../controllers/admin')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/add-product', isAuth, adminController.getAddPage)
router.post('/add-product', isAuth, adminController.postProduct)
router.get('/admin-products', isAuth, adminController.getAdminProducts)
router.get('/edit-product/:productId', isAuth, adminController.getEditPage)
router.post('/edit-product', isAuth, adminController.postEditProduct)
router.post('/delete-product', isAuth, adminController.deleteProduct)

exports.router = router;
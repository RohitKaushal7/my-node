const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()

router.get('/add-product',adminController.getAddPage)
router.post('/add-product',adminController.postProduct)
router.get('/admin-products',adminController.getAdminProducts)
router.get('/edit-product/:productId',adminController.getEditPage)
router.post('/edit-product',adminController.postEditProduct)
router.post('/delete-product',adminController.deleteProduct)

exports.router = router;
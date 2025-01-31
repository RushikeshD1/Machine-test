const express = require('express');
const productController = require('../controller/productController');

const router = express.Router()

router.post('/create', productController.createProduct)
router.get('/get', productController.getAllProduct)
router.put('/update/:ProductId', productController.updateProduct)
router.delete('/delete/:ProductId', productController.deleteProduct)

module.exports =  router;
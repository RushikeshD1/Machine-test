const express = require('express');
const  categoryController = require('../controller/categoryController')

const router = express.Router()

router.post('/create', categoryController.createCategory)
router.get('/get', categoryController.getAllCategory)
router.put('/update/:CategoryId', categoryController.updateCategory)
router.delete('/delete/:CategoryId', categoryController.deleteCategory)

module.exports =  router;
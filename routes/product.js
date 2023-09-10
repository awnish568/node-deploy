const express = require('express');

const productController = require('../controller/product');
const router = express.Router();

router.post('/', productController.createProduct)
router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProduct)
router.put('/:id', productController.replaceProduct)
router.patch('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct);

// using chaining
// router.post('/', productController.createProduct)
// .get('/', productController.getAllProducts)
// .get('/:id', productController.getProduct)
// .put('/:id', productController.replaceProduct)
// .patch('/:id', productController.updateProduct)
// .delete('/:id', productController.deleteProduct);


exports.router = router;  
const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/search', productsController.searchProduct);
router.post('/', productsController.create);
router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductsById);
router.delete('/:id', productsController.deleteProduct);
router.put('/:id', productsController.updateProductId);

module.exports = router;
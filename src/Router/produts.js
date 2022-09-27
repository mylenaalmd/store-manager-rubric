const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/search', productsController.searchProduct);
router.get('/', productsController.getProducts);
router.post('/', productsController.create);

router.get('/:id', productsController.getProductsById);
router.put('/:id', productsController.updateProductId);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
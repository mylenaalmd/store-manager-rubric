const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.getSales);
router.post('/', salesController.addSale);
router.get('/:id', salesController.getSalesById);
router.delete('/:id', salesController.deleteSale);
router.put('/:id', salesController.updateSale);

module.exports = router;
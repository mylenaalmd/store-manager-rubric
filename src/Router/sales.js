const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/', salesController.create);
router.get('/', salesController.getSales);
router.get('/:id', salesController.getSalesById);

module.exports = router;
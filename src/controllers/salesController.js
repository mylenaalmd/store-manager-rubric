const camelize = require('camelize');
const salesServices = require('../services/salesServices');

const getSales = async (_req, res) => {
  const result = await salesServices.getSales();
  res.status(200).json(camelize(result));
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const result = await salesServices.getSalesById(id);
  console.log(result);

  if (!result) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(camelize(result));
};

const addSale = async (req, res) => {
  const results = await salesServices.addSale(req.body);

  if (results.type) return res.status(results.type).json({ message: results.message });

  res.status(201).json(results);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const results = await salesServices.deleteSale(id);

  if (results.type) return res.status(404).json({ message: results.message });
  
  res.status(204).json({ message: null });
};

module.exports = {
  getSales, 
  getSalesById,
  addSale,
  deleteSale,
};
const salesServices = require('../services/salesServices');

const getSales = async (_req, res) => {
  const result = await salesServices.getSales();
  res.status(200).json(result);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const result = await salesServices.getSalesById(id);

  if (!result) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(result);
};

const create = async (req, res) => {
  const results = await salesServices.create(req.body);

  if (results.type) return res.status(results.type).json({ message: results.message });

  res.status(201).json(results);
};

module.exports = {
  getSales, 
  getSalesById,
  create,
};
const camelize = require('camelize');
const salesServices = require('../services/salesServices');

const getSales = async (_req, res) => {
  const result = await salesServices.getSales();

  res.status(200).json(camelize(result));
  // console.log(camelize(result));
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const result = await salesServices.getSalesById(id);

  if (result.length === 0) return res.status(404).json({ message: 'Sale not found' });

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
  
  res.sendStatus(204);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const boddy = req.body;

  const result = await salesServices.updateSale(id, boddy);

  if (result.type) return res.status(result.type).json({ message: result.message });

  res.status(200).json({ saleId: id, itemsUpdated: boddy });
};

module.exports = {
  getSales, 
  getSalesById,
  addSale,
  deleteSale,
  updateSale,
};
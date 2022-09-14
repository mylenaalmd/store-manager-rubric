const productServices = require('../services/productServices');

const getProducts = async (_req, res) => {
  const result = await productServices.getProducts();
  res.status(200).json(result);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const result = await productServices.getProductsById(id);

  if (!result) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(result);
};

const create = async (req, res) => {
  const { name } = req.body;
  const results = await productServices.create(name);

  res.status(201).json(results);
  
  if (results.type) return res.status(results.type).json({ message: results.message });
};

module.exports = {
  getProducts,
  getProductsById,
  create,
};

const productServices = require('../services/productServices');

const getProducts = async (_req, res) => {
  const result = await productServices.getProducts();
  res.status(200).json(result);
};

const searchProduct = async (req, res) => {
  const { q } = req.query;
  const result = await productServices.searchProduct(q);
  const filterResults = result.filter((item) => item.name.includes(q));

  if (!q) {
    return res.status(200).json(result);
  }
  
  if (!filterResults) return res.status(200).json([]);

  res.status(200).json(filterResults);
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

  if (results.type) return res.status(results.type).json({ message: results.message });
  
  res.status(201).json(results);
};

const updateProductId = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const results = await productServices.updateProductId(id, name);

  if (results.type) return res.status(results.type).json({ message: results.message });

  res.status(200).json(results);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const results = await productServices.deleteProduct(id);
  // console.log(id, 'results');

  if (results.type) return res.status(404).json({ message: results.message });
  
  res.status(204).end();
};

module.exports = {
  getProducts,
  getProductsById,
  create,
  updateProductId,
  deleteProduct,
  searchProduct,
};

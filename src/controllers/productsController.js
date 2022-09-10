const productServices = require('../services/productServices');

const getProducts = async (_req, res) => {
  const result = await productServices.getProducts();
  res.status(200).json(result);
};

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const results = await productServices.create(name);
    res.status(201).json(results);
  } catch (error) {
    next(error);
    // if (results.type) return res.status(results.type).json({ message: results.message });
  }
};

module.exports = {
  getProducts,
  create,
};

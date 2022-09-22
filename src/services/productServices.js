const validations = require('../middlewares/validations');
const productsModels = require('../models/productsModels');

const getProducts = async () => {
  const result = await productsModels.getProducts();
  return result;
};

const getProductsById = async (id) => {
  const result = await productsModels.getProductsById(id);
  return result[0];
};

const create = async (name) => {
  const valid = validations.validateName(name);

  if (valid.type) {
    return valid;
  }

  const result = await productsModels.create(name);
  return result;
};

const updateProductId = async (id, name) => {
  const valid = validations.validateName(name);

  if (valid.type) return valid;

  const result = await productsModels.updateProduct(id, name);

  return result;
};

module.exports = {
  create,
  getProducts,
  getProductsById,
  updateProductId,
};
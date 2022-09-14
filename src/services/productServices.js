const Joi = require('joi');

const productsModels = require('../models/productsModels');

const product = Joi.string().min(5).required();

const validateName = (name) => {
  const { error } = product.validate(name);

  if (error) {
    if (error.message === '"value" is required') {
      return { type: 400, message: error.message.replace('value', 'name') };
    }

    return { type: 422, message: error.message.replace('valeu', 'name') };
  }
  return { type: null, message: '' };
};

const getProducts = async () => {
  const result = await productsModels.getProducts();
  return result;
};

const getProductsById = async (id) => {
  const result = await productsModels.getProductsById(id);
  return result[0];
};

const create = async (name) => {
  const valid = validateName(name);

  if (valid.type) {
    return valid;
  }

  const result = await productsModels.create(name);
  return result;
};

module.exports = {
  create,
  getProducts,
  getProductsById,
};
const Joi = require('joi');
const productsModel = require('../models/productsModels');

const productName = Joi.string().min(5).required();
const number = Joi.number().integer().required();

const salesArr = Joi.array().items({
  productId: number,
  quantity: number.min(1),
});

const validateName = (name) => {
  const { error } = productName.validate(name);

  if (error) {
    if (error.message === '"value" is required') {
      return { type: 400, message: error.message.replace('value', 'name') };
    }

    return { type: 422, message: error.message.replace('value', 'name') };
  }
  return { type: null, message: '' };
};

const validadeSale = (array) => {
  const { error } = salesArr.validate(array);
  
  console.log(error);

  if (error) {
    if (error.message.includes('must be greater than or equal to 1')) {
      return { type: 422, message: error.message.replace('[0].', '') };
    }

    return { type: 400, message: error.message.replace('[0].', '') };
  }
  return { type: null };
};

const validadeProduct = async (body) => {
  const product = (await productsModel.getProducts()).map((item) => item.id);
  let valorInicial = {}; 

  body.forEach((item) => {
    if (!product.includes(item.productId)) {
      valorInicial = { type: 404, message: 'Product not found' };
    }
  });
  return valorInicial;
};

module.exports = {
  validadeSale,
  validateName,
  validadeProduct,
};
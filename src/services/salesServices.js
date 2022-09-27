const salesModels = require('../models/salesModels');
const validations = require('../middlewares/validations');

const addSale = async (body) => {
  const error = validations.validadeSale(body);
  if (error.type) return error;

  const result = await salesModels.addSale(body);
  if (result.type) return result;

  return { id: result, itemsSold: body };
};

const getSales = async () => {
  const result = await salesModels.getSales();
  return result;
};

const getSalesById = async (id) => {
  const result = await salesModels.getSalesById(id);
  return result[0];
};

module.exports = {
  getSales,
  getSalesById, 
  addSale,
};
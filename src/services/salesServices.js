const salesModels = require('../models/salesModels');
const validations = require('../middlewares/validations');

const getSales = async () => {
  const result = await salesModels.getSales();
  return result;
};

const getSalesById = async (id) => {
  const result = await salesModels.getSalesById(id);
  return result[0];
};

const create = async (name) => {
  const valid = validations.validadeSale(name);

  if (valid.type) {
    return valid;
  }

  const result = await salesModels.create(name);
  return result;
};

module.exports = {
  getSales,
  getSalesById, 
  create,
};
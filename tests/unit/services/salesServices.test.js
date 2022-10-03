const salesService = require('../../../src/services/salesServices');
const salesModel = require('../../../src/models/salesModels');
const mock = require('../../mocks/sales.mocks');
const sinon = require('sinon');
const { expect } = require('chai');

describe('Teste da camada service/Sales', () => {

  it('Testa a função addSales quando da certo', async () => {

    sinon.stub(salesModel, 'addSale').resolves(5);

    const result = await salesService.addSale(mock.addSaleTest);

    expect(result).to.be.deep.equal(mock.returnAddSaleTest);
  });

  it('Testa a função getSales', async () => {

    sinon.stub(salesModel, 'getSales').resolves([mock.returnAddSaleTest]);

    const result = await salesService.getSales();

    expect(result).to.be.deep.equal([mock.returnAddSaleTest]);
  });

  it('Testa a função getSalesById', async () => {

    sinon.stub(salesModel, 'getSalesById').resolves([mock.getSalesIdTest]);

    const result = await salesService.getSalesById(1);

    expect(result).to.be.equal([mock.getSalesIdTest]);
  });
})
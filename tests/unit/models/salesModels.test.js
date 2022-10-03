const connection = require('../../../src/models/connection');
const salesModels = require('../../../src/models/salesModels');
const productsModels = require('../../../src/models/productsModels');
const mock = require('../../mocks/sales.mocks');
const sinon = require('sinon');
const { expect } = require('chai');

describe('Testes da camada models/Sales', () => {

  it('Testa o retorno de todas as vendas', async () => {
    sinon.stub(connection, 'execute').resolves([mock.getSalesTest]);

    const result = await salesModels.getSales();

    expect(result[0]).to.have.property('saleId');
    expect(result[0]).to.have.property('date');
    expect(result[0]).to.have.property('productId');
    expect(result[0]).to.have.property('quantity');

  });

  it('Testa o retorno das vendas por ID', async () => {
    sinon.stub(connection, 'execute').resolves([mock.getSalesIdTest]);

    const result = await salesModels.getSalesById(1);

    expect(result).to.be.deep.equal([mock.getSalesIdTest])
  });

  it('Testa retorno das vendas quando a adição da certo', async () => {
    sinon.stub(productsModels, 'getProducts').resolves([1, 2, 3]);
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

    const result = await salesModels.addSale([mock.addSaleTest]);

    expect(result).to.be.equal(5);
  });
  
  afterEach(() => sinon.restore());
});
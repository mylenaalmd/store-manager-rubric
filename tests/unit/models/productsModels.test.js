const connection = require('../../../src/models/connection');
const productsModels = require('../../../src/models/productsModels');
const mock = require('../../mocks/products.mocks');
const sinon = require('sinon');
const { expect } = require('chai');

describe('Testes da camada models/Products', () => {

  it('Testa o retorno de todas os produtos', async () => {
    sinon.stub(connection, 'execute').resolves([mock.getProductsTest]);

    const result = await productsModels.getProducts();

    expect(result).to.be.deep.equal([mock.getProductsTest]);

  });

  // it('Testa o retorno dos produtos por ID', async () => {
  //   sinon.stub(connection, 'execute').resolves([mock.getProductsTest[0]]);

  //   const result = await productsModels.getProductsById(1);

  //   expect(result).to.be.deep.equal([mock.getSalesIdTest[0]]);
  // });

  it('Testa retorno da adição de um novo produtos quando da certo', async () => {
    sinon.stub(connection, 'execute').resolves([{ insertId: 5 }]);

    const name = 'Velas aromatizantes';

    const result = await productsModels.create(name);

    expect(result).to.have.property('id')
    expect(result).to.have.property('name');
    expect(result.id).to.be.equal(5);
    expect(result.name).to.be.equal(name);
  });
  
  afterEach(() => sinon.restore());
});
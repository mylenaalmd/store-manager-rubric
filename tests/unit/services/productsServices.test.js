const productService = require('../../../src/services/productServices');
const productsModels = require('../../../src/models/productsModels');
const mock = require('../../mocks/products.mocks');
const sinon = require('sinon');
const { expect } = require('chai');

describe('Teste da camada service/Product', () => {

  it('Testa a função getProductsId quando da certo', async () => {

    sinon.stub(productsModels, 'getProductsById').resolves([mock.getProductsTest[0]]);

    const result = await productService.getProductsById(1);

    expect(result).to.be.deep.equal(mock.getProductsTest[0]);
  });

  it('Testa a função getProduct', async () => {

    sinon.stub(productsModels, 'getProducts').resolves([mock.getProductsTest]);

    const result = await productService.getProducts();

    expect(result).to.be.deep.equal(mock.getProductsTest);
  });

  it('Testa a função create quando da certo', async () => {

    sinon.stub(productsModels, 'create').resolves({ id: 4, name: 'Velas aromatizantes'});

    const result = await productService.create('Velas aromatizantes');

    expect(result).to.be.deep.equal({id: 4, name: 'Velas aromatizantes'});
  });

  afterEach(() => sinon.restore());
})
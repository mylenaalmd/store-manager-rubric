const productsServices = require('../../../src/services/productServices');
const productController = require('../../../src/controllers/productsController');
const mock = require('../../mocks/products.mocks');
const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const camelize = require('camelize');

chai.use(sinonChai);

describe('Testes da camada Controller/Products', () => {
  it('Testa a função getProducts', async () => {
    sinon.stub(productsServices, 'getProducts').resolves(mock.getProductsTest);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.getProductsTest);
  });

  it('Testa a função getProductsById quando da certo', async () => {
    sinon.stub(productsServices, 'getProductsById').resolves(mock.getProductsTest[0]);

    const req = { params: { id: 1}};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.getProductsTest[0]);
  });

  it('Testa a função getProductsById quando da erro', async () => {
    sinon.stub(productsServices, 'getProductsById').resolves();

    const req = { params: { id: 1}};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.getProductsById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
  });

  it('Testa a função create quando da certo', async () => {
    sinon.stub(productsServices, 'create').resolves(['testando']);

    const req = { body:{name: 'tiara da mulher maravilha'}};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.create(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(['testando']);
  });

  it('Testa a função create quando da erro', async () => {
    sinon.stub(productsServices, 'create').resolves(mock.error);

    const req = { body:{name: 'tiara da mulher maravilha'}};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productController.create(req, res);

    expect(res.status).to.have.been.calledWith(mock.error.type);
    expect(res.json).to.have.been.calledWith({ message: mock.error.message });
  });

  afterEach(() => sinon.restore());
})
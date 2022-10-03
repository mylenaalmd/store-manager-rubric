const salesService = require('../../../src/services/salesServices');
const salesController = require('../../../src/controllers/salesController');
const mock = require('../../mocks/sales.mocks');
const sinon = require('sinon');
const { expect } = require('chai');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const camelize = require('camelize');

chai.use(sinonChai);

describe('Testes da camada Controller/Sales', () => {
  it('Testa a função addSale qunado da certo', async () => {
    sinon.stub(salesService, 'addSale').resolves(mock.returnAddSaleTest);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.addSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mock.returnAddSaleTest);
  });

  it('Testa a função addSale quando da erro', async () => {
    sinon.stub(salesService, 'addSale').resolves({ type: 400, message: 'Erro' });

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.addSale(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: 'Erro' });
  });

  it('Testa a função getSales', async () => {
    sinon.stub(salesService, 'getSales').resolves(mock.getSalesTest);

    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mock.getSalesTest);
  });

  it('Testa a função getSalesById', async () => {
    sinon.stub(salesService, 'getSalesById').resolves(mock.getSalesIdTest);

    const req = { params: { id: 1}};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(camelize(mock.getSalesIdTest));
  });

  it('Testa a função deleteSale quando da certo', async () => {
    sinon.stub(salesService, 'deleteSale').resolves({ type: null });

    const req = { params: { id: 1}};
    const res = {};

    res.sendStatus = sinon.stub().returns(res);

    await salesController.deleteSale(req, res);

    expect(res.sendStatus).to.have.been.calledWith(204);
  });

  afterEach(() => sinon.restore());
})

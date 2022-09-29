const connection = require('./connection');
const validationProducts = require('../middlewares/validations');

const getSales = async () => {
  const [results] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity FROM StoreManager.sales_products AS sale_prod
    INNER JOIN StoreManager.sales AS sales
    ON sales.id = sale_prod.sale_id ORDER BY id ASC`,
  );
  return results;
};

const getSalesById = async (id) => {
  const results = await connection.execute(
    `SELECT date, product_id, quantity FROM StoreManager.sales_products AS sale_prod
    INNER JOIN StoreManager.sales AS sales
    ON sales.id = sale_prod.sale_id
    WHERE sale_id = ?;`,
    [id],
);
  
  return results;
};

const addSale = async (body) => {
  // const query = 'INSERT INTO exercises.employees (first_name, last_name, office) VALUES(?, ?, ?)';
  const valorInicial = await validationProducts.validadeProduct(body);
  if (valorInicial.type) return valorInicial;

  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUES (now())',
  );
    // console.log(insertId);

  await Promise.all(
  body.map((cur) => connection.execute(
      'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES(?, ?, ?)',
      [insertId, cur.productId, cur.quantity],
    )),
  );
      return insertId;
};

const deleteSale = async (id) => {
  const exist = await getSalesById(id);

  if (exist[0].lenght === 0) return { type: 204, message: 'Sale not found' };

  await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  
  return { type: null };
};

const updateSale = async (id, body) => {
  const valorInicial = await validationProducts.validadeProduct(body);
  if (valorInicial.type) return valorInicial;

  const exist = await getSalesById(id);
  if (exist[0].length === 0) return { type: 404, message: 'Sale not found' };

  body.forEach(async (cur) => {
    await connection.execute(
      `UPDATE StoreManager.sales_products
      SET product_id =?, quantity = ?, 
      WHERE sale_id = ? AND product_id = ?`,
      [cur.productId, cur.quantity, id, cur.productId],
    );
  });
  
  return { type: null };
};

module.exports = {
  getSales, 
  getSalesById, 
  addSale,
  deleteSale,
  updateSale,
};
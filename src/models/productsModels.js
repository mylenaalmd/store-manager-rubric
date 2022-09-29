const connection = require('./connection');

const getProducts = async () => {
  const [results] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
  );
  // console.log(results);
  return [results];
};

const searchProduct = async (q) => {
  const [results] = await connection.execute(
  'SELECT * FROM StoreManager.products WHERE name = ?',
    [q],
  );
  // console.log(results);
  return results;
};

const getProductsById = async (id) => {
  const [results] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return results;
};

const create = async (name) => {
  // const query = 'INSERT INTO exercises.employees (first_name, last_name, office) VALUES(?, ?, ?)';
  const [results] = await connection.execute(
    'INSERT INTO StoreManager.products(name) VALUES(?)',
    [name],
  );
  return { id: results.insertId, name };
};

const updateProductId = async (id, name) => {
  const e = await getProductsById(id);

  if (e.length === 0) return { type: 404, message: 'Product not found' };
  
    await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, id],
  );
  return { id, name };
};

const deleteProduct = async (id) => {
  const exist = await getProductsById(id);

  if (exist.lenght === 0) return { type: 204, message: 'Product not found' };

  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  
  return { type: null };
};

module.exports = {
  getProducts,
  getProductsById,
  create,
  updateProductId,
  deleteProduct,
  searchProduct,
};
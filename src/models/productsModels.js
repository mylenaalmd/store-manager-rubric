const connection = require('./connection');

const getProducts = async () => {
  const [results] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id ASC',
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

module.exports = {
  getProducts,
  create,
};
const connection = require('./connection');

const getSales = async () => {
  const [results] = await connection.execute(
    'SELECT * FROM StoreManager.sales ORDER BY id ASC',
  );
  return results;
};

const getSalesById = async (id) => {
  const [results] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return results;
};

const create = async (name) => {
  // const query = 'INSERT INTO exercises.employees (first_name, last_name, office) VALUES(?, ?, ?)';
  const [results] = await connection.execute(
    'INSERT INTO StoreManager.sales(name) VALUES(?)',
    [name],
  );
  return { id: results.insertId, name };
};

module.export = {
  getSales, 
  getSalesById, 
  create,
};
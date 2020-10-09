const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'QLCV',
  password: '',
  port: 5432,
});
module.exports = pool;
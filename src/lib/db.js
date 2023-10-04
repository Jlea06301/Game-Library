// db.js

import mysql from 'mysql2/promise';

// Crea una "pool" de conexiones para gestionar múltiples conexiones simultáneas.
const pool = mysql.createPool({
  host: process.env.MARIADB_HOST,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE
});

export async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

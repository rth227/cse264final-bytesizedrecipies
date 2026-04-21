// connects to postgres database

import { Pool } from 'pg';

// keeping db connections open 
const pool = new Pool({
  user:     process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host:     process.env.POSTGRES_HOST,
  port:     Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DBNAME,
});

export default pool;
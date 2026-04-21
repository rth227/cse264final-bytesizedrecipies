// connects to postgres database

import { Pool } from 'pg';

const pool = new Pool({
  user:     process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host:     process.env.POSTGRES_HOST,
  port:     Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DBNAME,
  ssl:     { rejectUnauthorized: false },
});

export default pool;
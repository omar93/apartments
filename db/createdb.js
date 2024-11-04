import pg from 'pg'
const { Client } = pg
 
export const client = new Client({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: 'localhost',
    port: process.env.PG_PORT,
    database: process.env.PG_DB,
  })



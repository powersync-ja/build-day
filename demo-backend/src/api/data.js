import express from 'express';
import pg from 'pg';
import config from '../../config.js';

const { Pool } = pg;

const router = express.Router();

const pool = new Pool({
  host: config.database.host,
  database: config.database.name,
  user: config.database.user,
  password: config.database.password,
  port: config.database.port
});

pool.on('error', (err, client) => {
  console.error('Pool connection failure to postgres:', err, client);
});

/**
 * Handle all PUT events sent to the server by the client PowerSync application
 */
router.put('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Invalid body provided'
    });
    return;
  }

  await upsert(req.body, res);
});

/**
 * Handle all PATCH events sent to the server by the client PowerSync application
 */
router.patch('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Invalid body provided'
    });
    return;
  }

  await upsert(req.body, res);
});

/**
 * Handle all DELETE events sent to the server by the client PowerSync application
 */
router.delete('/', async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Invalid body provided'
    });
    return;
  }

  const table = req.body.table;
  const data = req.body.data;

  if (!table || !data?.id) {
    res.status(400).send({
      message: 'Invalid body provided, expected table and data'
    });
    return;
  }

  let sql = null;
  const values = [data.id];

  switch (table) {
    case 'messages':
      sql = 'DELETE FROM messages WHERE id = $1';
      break;
    default:
      break;
  }

  const client = await pool.connect();
  await client.query(sql, values);
  await client.release();
  res.status(200).send({
    message: `PUT completed for ${table} ${data.id}`
  });
});

const upsert = async (body, res) => {
  const table = body.table;
  const data = body.data;

  let sql = null;
  let values = [];

  switch (table) {
    case 'messages':
      sql =
        'INSERT INTO messages(id, created_at, message, name, "group") VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET created_at = EXCLUDED.created_at, name = EXCLUDED.name';
      values = [data.id, data.created_at, data.message, data.name, data.group];
      break;
    default:
      break;
  }
  if (sql && values.length > 0) {
    const client = await pool.connect();
    await client.query(sql, values);
    await client.release();
    res.status(200).send({
      message: `PUT completed for ${table} ${data.id}`
    });
  } else {
    res.status(400).send({
      message: 'Invalid body provided, expected table and data'
    });
  }
};

export { router as dataRouter };

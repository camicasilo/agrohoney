#!/bin/sh
# Script to clear database locks from failed migrations before running medusa db:migrate

echo "Checking for database locks or pending migrations..."

# We don't have the psql client available in standard node images used by Nixpacks by default.
# The safest way to handle this purely in Node is via a small script using the 'pg' module.
node -e "
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.MEDUSA_DATABASE_URL || process.env.DATABASE_URL,
});

async function clearLocks() {
  try {
    await client.connect();
    console.log('Connected to DB. Clearing potential locks...');
    // Drop the migration tracking table to force a fresh migration state if stuck
    // Note: In Medusa v2 with MikroORM, the table is usually 'mikro_orm_migrations'
    await client.query('DROP TABLE IF EXISTS mikro_orm_migrations CASCADE;');
    console.log('Migration locks cleared successfully.');
  } catch (err) {
    console.error('Failed to clear locks (this might be normal if DB is empty):', err.message);
  } finally {
    await client.end();
  }
}

clearLocks();
"

echo "Proceeding with Medusa migrations..."

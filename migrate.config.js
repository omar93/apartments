export default {
    databaseUrl: process.env.DATABASE_URL,
    migrationsTable: 'pgmigrations', // Optional: custom table for tracking migrations
    dir: 'migrations', // Path to the migrations folder
  };
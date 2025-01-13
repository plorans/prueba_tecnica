import cliente from 'pg'


const { Pool } = cliente;

const pool = new Pool ({
  // connectionString: process.env.DATABASE_URL,
  // ssl:true

  user: 'postgres',
  host: 'localhost',
  database: 'back',
  password: '2255',
  port: 5432

});

export {pool};
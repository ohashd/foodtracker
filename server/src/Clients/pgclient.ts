import pg from 'pg';
const pool = new pg.Pool({
	host: process.env.PGHOST,
	port: parseInt(process.env.PGPORT || '5432'),
	database: process.env.PGDATABASE,
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
});

export default pool;
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(30) UNIQUE,
	passwordhash CHAR(60)
);

CREATE UNIQUE INDEX username_index ON users(username);
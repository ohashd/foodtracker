# Food Tracker Server

This project contains the backend for the Food Tracker App.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [Node](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Flyway](https://flywaydb.org/)

### Install Node packages

```
npm i
```

### Setup Environment

Fill in the `PGPASSWORD` variable in `.env.example` file and rename it to `.env`. You can run `openssl rand -base64 33` to generate a password.

### Setup the Database

From a vanilla PostgreSQL installation, you'll want to create an admin user:

```
npx dotenv printenv PGPASSWORD | \
psql postgres -c "CREATE ROLE admin WITH LOGIN PASSWORD '`cat`'; ALTER ROLE admin CREATEDB;"
```

And create a database with the admin user:

```
npx dotenv printenv PGDATABASE | npx dotenv -- psql postgres -c "CREATE DATABASE `cat`;"
```

Confirm connections will work by running:
```
npx dotenv psql
```

### Execute migrations

```
npx dotenv flyway migrate
```

## Running the tests

TBD


### Styling

TBD

### Deployment

TBD

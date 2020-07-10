import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { RequestHandler } from 'express'
import ev from "express-validator";
let { validationResult } = ev;
import { signToken } from '../Middlewares/auth.js';
import { UserError } from '../Middlewares/errors.js';
import pgclient from '../Clients/pgclient.js';

export const getUsers: RequestHandler = async function (request, response) {
    let results = await pgclient.query('SELECT * FROM users ORDER BY id ASC');
    response.status(200).json(results.rows);
};

export const getUserById: RequestHandler = async function (request, response) {
    let id = parseInt(request.body.id);
    let results = await pgclient.query('SELECT * FROM users WHERE id = $1', [id])
    response.status(200).json(results.rows);
};

// Creates user in database, returns JWT.
export const createUser: RequestHandler = async function (request, response, next) {
    try {
        let { username, password } = request.body;
        request.logger.debug(`createUser: start ${username}`);

        let users = await pgclient.query(
            'SELECT username FROM users WHERE username = $1', [username]); 
        
        if ( users.rowCount > 0) {
            request.logger.debug(`createUser: username ${username} already taken`);
            throw new UserError(422, "Username already taken!");
        }

        let passwordhash = await bcrypt.hash(password, 12);
        let user = await pgclient.query(
            'INSERT INTO users (username, passwordhash) VALUES ($1, $2) RETURNING id',
            [username, passwordhash]);

        request.logger.debug(`createUser: success for ${username}`);
        let token = await signToken({exp: 60*1000, sub: user.rows[0].id});
        response.status(200).json({token, username});
    } catch (error) {
        next(error);
    }
};

export const updateUser: RequestHandler = async function (request, response) {
    let id = parseInt(request.params.id);
    let username = request.body.username;
    let results = await pgclient.query('UPDATE users SET username = $1 WHERE id = $2', [username, id]);
    response.status(200).send("User modified with ID: " + id);
};

export const deleteUser: RequestHandler = async function (request, response) {
    let id = parseInt(request.params.id);
    let results = await pgclient.query('DELETE FROM users WHERE id = $1', [id]);
    response.status(200).send("User deleted with ID: " + id);
};

// Tries to login user, returns a JWT to user.
export const loginUser: RequestHandler = async function (request, response, next) {
    try {
        let { username, password } = request.body;
        request.logger.debug(`loginUser: start ${username}`);

        let users = await pgclient.query('SELECT * FROM users WHERE username = $1', [username]);
        if ( users.rows.length === 0 ) {
            request.logger.debug(`loginUser: no row for ${username}`);
            response.status(422).send("Invalid username & password combination.");
            return
        }

        let isSameHash = await bcrypt.compare(password, users.rows[0].passwordhash);
        if ( !isSameHash ) {
            request.logger.debug(`loginUser: bad password for ${username}`);
            response.status(422).send("Invalid username & password combination.");
            return
        }

        request.logger.debug(`loginUser: success for ${username}`);
        let token = await signToken({exp: 60*1000, sub: users.rows[0].id})
        response.status(200).json({token, username});
    } catch (error) {
        next(error);
    }
}
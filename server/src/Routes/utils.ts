import type { RequestHandler } from 'express';
import { UserError } from '../Middlewares/errors.js';


export const resourceNotFound: RequestHandler = function(req, res) {
	throw new UserError(404, "Resource not found.");
}

export const methodNotAllowed: RequestHandler = function (req, res) {
	throw new UserError(405, "Method not allowed.");
}
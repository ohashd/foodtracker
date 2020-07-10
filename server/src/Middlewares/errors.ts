import type { Request, Response, ErrorRequestHandler } from 'express';

export interface NestedError {
	message: string
}

// This is an error that will be displayed to the user.
export class UserError extends Error {
	code: number;
	errors?: NestedError[]
	constructor(code: number, message: string, errors?: NestedError[]) {
		super(message);
		// Hack to get instanceof working for classes that extend Error.
		// See: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
		Object.setPrototypeOf(this, UserError.prototype);
		this.code = code;
		this.errors = errors;
	}
}

export const handleError: ErrorRequestHandler = function(err, req, res, next){
	if ( err instanceof UserError ) {
		res.status(err.code).json({
			error: {
				code: err.code,
				message: err.message,
				errors: err.errors
			}
		});
	} else {
		req.error = err;
		res.status(500).json({
			error: {
				code: 500,
				message: `Unknown error. Please report the following id to us: ${req.id}`
			}
		});
	}
}
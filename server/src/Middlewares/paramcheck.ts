import type { RequestHandler } from 'express';
import ev from "express-validator";
let { validationResult } = ev;

import { NestedError, UserError } from "./errors.js";

const errorFormatter: ev.ErrorFormatter<NestedError> = ({ location, msg, param, value, nestedErrors }) => {
	return {
		message: msg
	}
}

export const paramCheck: RequestHandler = function(req, res, next){
	const errors = validationResult(req).formatWith(errorFormatter);
	if ( errors.isEmpty() ) {
		next()
	} else {
		throw new UserError(422, "There was an issue with the submitted parameters.", errors.array());
	}
}
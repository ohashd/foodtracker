import express  from 'express';
import users from './users.js';
import login from './login.js';
import { UserError, handleError } from '../Middlewares/errors.js';
import { resourceNotFound } from './utils.js';

import type { Request, Response } from 'express';
let router = express.Router();

router.use("/users", users);
router.use("/login", login);

router.get('/usererror', function (req, res) {
	throw new UserError(400, "Test User Error");
});

router.get('/unknownerror', function (req, res) {
	throw Error("Unknown Error");
});

router.use(resourceNotFound);
router.use(handleError);

export default router;
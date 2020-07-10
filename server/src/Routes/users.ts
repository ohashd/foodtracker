import express from 'express';
import ev from "express-validator";
import { createUser, loginUser } from '../Controllers/users.js';
import { methodNotAllowed } from './utils.js';
import { paramCheck } from '../Middlewares/paramcheck.js';
let { body } = ev;

let router = express.Router();

let usernameValidation = body("username").exists().withMessage("You must provide a username.").bail()
	.isLength({min: 4, max: 30}).withMessage("Username must be betweeen 4 and 30 characters.")
	.isAlphanumeric().withMessage("Username must only include letters and numbers.")

let passwordValidation = body("password").exists().withMessage("You must provide a password.").bail()
	.isLength({min: 8}).withMessage("Password must be at least 8 characters.")

// router.get('/', users.getUsers);
router.post('/', [
	usernameValidation,
	passwordValidation
	], paramCheck, createUser);
router.all('/', methodNotAllowed);

router.post('/login', [
	usernameValidation,
	passwordValidation
	], paramCheck, loginUser);
router.all('/login', methodNotAllowed);

// router.get('/:id', users.getUserById);
// router.put('/:id', users.updateUser);
// router.delete('/:id', users.deleteUser);
// router.all('/:id', methodNotAllowed);

export default router;
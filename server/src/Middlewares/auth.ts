import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';

export const signToken = async function(payload: object, options: SignOptions = {}) {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, process.env.JWTKEY, options, (err, token) => {
			if (err) {
				reject(err);
			} else {
				resolve(token);
			}
		});
	});
}

export const verifyToken = async function(token: string, options: SignOptions = {}) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, process.env.JWTKEY, options, (err, payload) => {
			if (err) {
				reject(err);
			} else {
				resolve(payload);
			}
		})
	})
}
import { Logger } from 'pino';
declare global {
	declare namespace Express {
	   export interface Request {
	      id: string,
	      startTime: Date,
	      logger: Logger,
	      error?: Error
	   }
	}
}
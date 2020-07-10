import { Request, Response, RequestHandler } from 'express';
import { v4 } from 'uuid';
import pino from 'pino';
const _logger = pino({level: "debug"});

function onEnd(logger: pino.Logger, req: Request, res: Response){
	return (streamErr?: Error) => {
		let endTime = new Date();
		let responseTime = endTime.getMilliseconds() - req.startTime.getMilliseconds();
		let error = req.error || streamErr;
		let logObj = {
			pid: process.pid,
			ip: req.ip,
			method: req.method,
			time: endTime,
			path: req.originalUrl,
			status: res.statusCode,
			responseTime,
			error: error ? {
				message: error.message,
				stack: error.stack
			} : undefined
		};
		error ? logger.error(logObj) : logger.info(logObj);
	}
}

export const loggerMiddleware: RequestHandler = function(req, res, next){

	req.id = v4();
	req.startTime = new Date();

	/// Expose logger through request object.
	req.logger = _logger.child({
		id: req.id
	});

	res.on('finish', onEnd(req.logger, req, res));
	res.on('error', onEnd(req.logger, req, res));

	next();
}

export default loggerMiddleware;
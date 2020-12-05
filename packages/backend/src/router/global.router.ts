import { Request, Response, Router } from 'express';
import { labelRouter } from './label.router';
import { taskRouter } from './task.router';
import { trackingRouter } from './tracking.router';

export const globalRouter = Router({ mergeParams: true });

globalRouter.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

globalRouter.get('/', async (_: Request, res: Response) => {
	res.send({ message: 'Hello api' });
});

globalRouter.use('/task', taskRouter);
globalRouter.use('/label', labelRouter);
globalRouter.use('/tracking', trackingRouter);

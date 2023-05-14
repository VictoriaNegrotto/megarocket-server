import { Router } from 'express';
import subscriptionRouter from './subscription';
import classRoute from './class';

const router = Router();

router.use('/subscriptions', subscriptionRouter);

router.use('/class', classRoute);

export default router;

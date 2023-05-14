import { Router } from 'express';
import adminsRouter from './admins';
import classRoute from './class';

const router = Router();
router.use('/admins', adminsRouter);
router.use('/class', classRoute);

export default router;

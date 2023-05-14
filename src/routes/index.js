import { Router } from 'express';
import trainerRoute from './trainer';
import adminsRouter from './admins';
import classRoute from './class';

const router = Router();

router.use('/trainer', trainerRoute);
router.use('/admins', adminsRouter);
router.use('/class', classRoute);

export default router;

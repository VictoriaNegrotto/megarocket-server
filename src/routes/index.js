import { Router } from 'express';
import subscriptionRouter from './subscription';
import trainerRoute from './trainer';
import adminsRouter from './admins';
import memberRouter from './member';
import classRoute from './class';

const router = Router();

router.use('/subscriptions', subscriptionRouter);

router.use('/trainer', trainerRoute);
router.use('/member', memberRouter);
router.use('/admins', adminsRouter);
router.use('/class', classRoute);

export default router;

import { Router } from 'express';
import subscriptionRouter from './subscription';
import activityRouter from './activity';
import trainerRoute from './trainer';
import adminsRouter from './admins';
import memberRouter from './member';
import classRoute from './class';
import superAdminRoute from './super-admins';
import authRouter from './auth';

const router = Router();
router.use('/member', memberRouter);
router.use('/subscriptions', subscriptionRouter);
router.use('/activity', activityRouter);
router.use('/trainer', trainerRoute);
router.use('/member', memberRouter);
router.use('/admins', adminsRouter);
router.use('/class', classRoute);
router.use('/superadmin', superAdminRoute);
router.use('/auth', authRouter);

export default router;

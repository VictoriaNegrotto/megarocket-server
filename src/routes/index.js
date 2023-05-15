import { Router } from 'express';
import activityRouter from './activity';
import trainerRoute from './trainer';
import adminsRouter from './admins';
import memberRouter from './member';
import classRoute from './class';
import suscriptionRoute from './subscription';
import superAdminRoute from './super-admins';

const router = Router();

router.use('/activity', activityRouter);
router.use('/trainer', trainerRoute);
router.use('/member', memberRouter);
router.use('/admins', adminsRouter);
router.use('/class', classRoute);
router.use('/suscription', suscriptionRoute);

router.use('/superadmin', superAdminRoute);

export default router;

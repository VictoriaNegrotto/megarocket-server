import { Router } from 'express';
import adminsRouter from './admins';
import memberRouter from './member';
import classRoute from './class';
import trainerRoute from './trainer';

const router = Router();

router.use('/trainer', trainerRoute);
router.use('/member', memberRouter);
router.use('/admins', adminsRouter);
router.use('/class', classRoute);

export default router;

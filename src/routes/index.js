import { Router } from 'express';
import memberRouter from './member';
import classRoute from './class';
import adminsRouter from './admins';

const router = Router();

router.use('/member', memberRouter);
router.use('/admins', adminsRouter);
router.use('/class', classRoute);

export default router;

import { Router } from 'express';
import memberRouter from './member';
import classRoute from './class';

const router = Router();

router.use('/member', memberRouter);
router.use('/class', classRoute);

export default router;

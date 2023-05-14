import { Router } from 'express';
import memberRouter from './member';

const router = Router();

router.use('/member', memberRouter);

export default router;

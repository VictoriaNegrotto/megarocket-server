import { Router } from 'express';
import adminsRouter from './admins';

const router = Router();

router.use('/admins', adminsRouter);

export default router;

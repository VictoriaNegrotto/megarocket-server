import { Router } from 'express';
import activityRouter from './activity';

const router = Router();

router.use('/activity', activityRouter);

export default router;

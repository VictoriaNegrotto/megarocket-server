import { Router } from 'express';
import trainerRoute from './trainer';
import classRoute from './class';

const router = Router();

router.use('/trainer', trainerRoute);
router.use('/class', classRoute);

export default router;

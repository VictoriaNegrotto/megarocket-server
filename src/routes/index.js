import { Router } from 'express';
import trainerRoute from './trainer';

const router = Router();

router.use('/trainer', trainerRoute);

export default router;

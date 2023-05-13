import { Router } from 'express';

import trainersRouter from './trainer';

const router = Router();

router.use('trainers', trainersRouter);

export default router;

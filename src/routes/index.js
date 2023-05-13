import { Router } from 'express';
import classRoute from './class';

const router = Router();

router.use('/class', classRoute);

export default router;

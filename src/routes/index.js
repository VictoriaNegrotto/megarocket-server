import { Router } from 'express';
import classRoute from './class';
import superAdminRoute from './super-admins';

const router = Router();

router.use('/class', classRoute);

router.use('/superadmin', superAdminRoute);

export default router;

import { Router } from 'express';
import classRoute from './class';
import suscriptionRoute from './subscription';

const router = Router();

router.use('/class', classRoute);
router.use('/suscription', suscriptionRoute);

export default router;

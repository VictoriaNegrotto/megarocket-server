import { Router } from 'express';
import authController from '../controllers/auth';

const authRouter = Router();

authRouter
  .get('/', authController.getAuth);

export default authRouter;

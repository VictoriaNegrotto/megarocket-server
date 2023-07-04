import { Router } from 'express';
import authController from '../controllers/auth';
import verifyToken from '../middlewares/authMiddleware';

const authRouter = Router();

authRouter
  .get('/', verifyToken(['SUPERADMIN', 'ADMIN', 'MEMBER', 'TRAINER']), authController.getAuth);

export default authRouter;

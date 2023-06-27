import { Router } from 'express';
import activityController from '../controllers/activity';
import validations from '../validations/activity';
import verifyToken from '../middlewares/authMiddleware';

const activityRouter = Router();

activityRouter
  .get('/', verifyToken(['ADMIN', 'MEMBER']), activityController.getAllActivity)
  .post('/', verifyToken(['ADMIN']), validations.validateCreation, activityController.createActivity)
  .put('/:id', verifyToken(['ADMIN']), validations.validateUpdate, activityController.updateActivity)
  .delete('/:id', verifyToken(['ADMIN']), activityController.deleteActivity)
  .get('/:id', verifyToken(['ADMIN']), activityController.getActivityById)
  .get('/filter/:name', verifyToken(['ADMIN', 'MEMBER']), activityController.getActivityByName);

export default activityRouter;

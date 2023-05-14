import { Router } from 'express';
import activityController from '../controllers/activity';
import validations from '../validations/activity';

const activityRouter = Router();

activityRouter
  .put('/:id', validations.validateUpdate, activityController.updateActivity)
  .delete('/:id', activityController.deleteActivity)
  .get('/:id', activityController.getActivityById)
  .get('/filter/:name', activityController.getActivityByName);

export default activityRouter;

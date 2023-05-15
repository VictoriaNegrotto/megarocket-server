import { Router } from 'express';
import activityController from '../controllers/activity';
import validations from '../validations/activity';

const activityRouter = Router();

activityRouter
  .get('/', activityController.getAllActivity)
  .post('/', validations.validateUpdate, activityController.createActivity)
  .put('/:id', validations.validateUpdate, activityController.updateActivity)
  .delete('/:id', activityController.deleteActivity)
  .get('/:id', activityController.getActivityById)
  .get('/filter/:name', activityController.getActivityByName);

export default activityRouter;

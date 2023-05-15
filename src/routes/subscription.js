import { Router } from 'express';
import validations from '../validations/subscription';
import subscriptionController from '../controllers/subscription';

const subscriptionRouter = Router();

subscriptionRouter
  .get('/:id', subscriptionController.filterSubscriptionById)
  .put('/:id', validations.validateUpdate, subscriptionController.updateSubscription)
  .delete('/:id', subscriptionController.deleteSubscription)
  .get('/', subscriptionController.getAllSubscriptions)
  .post('/', validations.validateCreate, subscriptionController.createSubscription);

export default subscriptionRouter;

import { Router } from 'express';
import validations from '../validations/subscription';
import subscriptionControllers from '../controllers/subscription';

const subscriptionRouter = Router();

subscriptionRouter
  .get('/', subscriptionControllers.getAllSubscriptions)
  .post('/', validations.validateCreate, subscriptionControllers.createSubscription);

export default subscriptionRouter;

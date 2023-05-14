import { Router } from 'express';
import subscriptionControllers from '../controllers/subscription';
import validations from '../validations/subscription';

const subscriptionRouter = Router();

subscriptionRouter.get('/', subscriptionControllers.getAllSubscriptions);
subscriptionRouter.post('/', validations.validateCreate, subscriptionControllers.createSubscription);

export default subscriptionRouter;

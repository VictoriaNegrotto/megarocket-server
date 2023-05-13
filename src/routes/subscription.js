import { Router } from 'express';
import subscriptionControllers from '../controllers/subscription';

const subscriptionRouter = Router();

subscriptionRouter.get('/', subscriptionControllers.getAllSubscriptions);
subscriptionRouter.get('/:id', subscriptionControllers.getSubscriptionById);
subscriptionRouter.post('/', subscriptionControllers.createSubscription);

export default subscriptionRouter;

import { Router } from 'express';
import validations from '../validations/subscription';
import suscriptionController from '../controllers/subscription';

const suscriptionRoute = Router();

suscriptionRoute
  .get('/:id', suscriptionController.getSuscriptionById)
  .put('/id:', validations.validateUpdate, suscriptionController.updateSuscription)
  .delete('/id:', suscriptionController.deleteSusciption);

export default suscriptionRoute;

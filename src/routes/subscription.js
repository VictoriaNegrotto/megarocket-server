import { Router } from 'express';
import validations from '../validations/subscription';
import suscriptionController from '../controllers/subscription';

const suscriptionRoute = Router();

suscriptionRoute
  .get('/:id', suscriptionController.filterSuscriptionById)
  .put('/id:', validations.validateUpdate, suscriptionController.updateSuscription)
  .delete('/id:', suscriptionController.deleteSusciption);

export default suscriptionRoute;

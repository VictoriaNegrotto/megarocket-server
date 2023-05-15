import { Router } from 'express';
import trainerControllers from '../controllers/trainer';
import validations from '../validations/trainer';

const trainerRoute = Router();

trainerRoute
  .get('/:id', trainerControllers.getTrainerById)
  .put('/:id', validations.validateUpdate, trainerControllers.updateTrainer)
  .delete('/:id', trainerControllers.deleteTrainer)
  .get('/', trainerControllers.getAllTrainers)
  .post('/', validations.trainerCreate, trainerControllers.createTrainer);

export default trainerRoute;

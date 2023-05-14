import { Router } from 'express';
import validation from '../validations/trainer';
import trainerController from '../controllers/trainer';

const trainerRoute = Router();

trainerRoute
  .get('/:id', trainerController.getTrainerById)
  .put('/:id', validation.validateUpdate, trainerController.updateTrainer)
  .delete('/:id', trainerController.deleteTrainer);

export default trainerRoute;

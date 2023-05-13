import express from 'express';
import validation from '../validations/trainer';
import trainerController from '../controllers/trainer';

const trainerRoute = express.Router();

trainerRoute.get('/:id', trainerController.getTrainerById)
  .put('/:id', validation.validateUpdate, trainerController.updateTrainer);

export default trainerRoute;

import { Router } from 'express';
import trainerControllers from '../controllers/trainer';
import validations from '../validations/trainer';

const trainerRoute = Router();

trainerRoute
  .get('/', trainerControllers.getAllTrainers)
  .post('/', validations.trainerCreate, trainerControllers.createTrainer);

export default trainerRoute;

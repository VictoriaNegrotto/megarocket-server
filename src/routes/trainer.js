import { Router } from 'express';
import trainerControllers from '../controllers/trainer';
import validations from '../validations/trainer';
import verifyToken from '../middlewares/authMiddleware';

const trainerRoute = Router();

trainerRoute
  .get('/:id', verifyToken(['ADMIN', 'TRAINER']), trainerControllers.getTrainerById)
  .put('/:id', verifyToken(['ADMIN', 'TRAINER']), validations.validateUpdate, trainerControllers.updateTrainer)
  .delete('/:id', verifyToken(['ADMIN']), trainerControllers.deleteTrainer)
  .get('/', verifyToken(['ADMIN']), trainerControllers.getAllTrainers)
  .post('/', verifyToken(['ADMIN']), validations.trainerCreate, trainerControllers.createTrainer);

export default trainerRoute;

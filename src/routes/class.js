import { Router } from 'express';
import validations from '../validations/class';
import classController from '../controllers/class';
import verifyToken from '../middlewares/authMiddleware';

const classRoute = Router();

classRoute
  .get('/', verifyToken(['ADMIN', 'TRAINER', 'MEMBER']), classController.getAllClasses)
  .get('/:id', verifyToken(['ADMIN', 'MEMBER']), classController.getClassById)
  .get('/trainer/:idTrainer', verifyToken(['ADMIN']), classController.getClassByTrainer)
  .put('/:id', verifyToken(['ADMIN']), validations.validateUpdate, classController.updateClass)
  .delete('/:id', verifyToken(['ADMIN']), classController.deleteClass)
  .post('/', verifyToken(['ADMIN']), validations.validateCreate, classController.createClass);

export default classRoute;

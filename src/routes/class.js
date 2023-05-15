import { Router } from 'express';
import validations from '../validations/class';
import classController from '../controllers/class';

const classRoute = Router();

classRoute
  .get('/', classController.getAllClasses)
  .get('/:id', classController.getClassById)
  .put('/:id', validations.validateUpdate, classController.updateClass)
  .delete('/:id', classController.deleteClass)
  .post('/', validations.validateCreate, classController.createClass);

export default classRoute;

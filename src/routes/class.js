import { Router } from 'express';
import validations from '../validations/class';
import classController from '../controllers/class';

const classRoute = Router();

classRoute
  .get('/:id', classController.getClassById)
  .put('/:id', validations.validateUpdate, classController.updateClass)
  .delete('/:id', classController.deleteClass);

export default classRoute;

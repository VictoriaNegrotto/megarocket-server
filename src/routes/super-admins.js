import { Router } from 'express';
import validations from '../validations/super-admins';
import superAdminController from '../controllers/super-admins';

const superAdminRoute = Router();

superAdminRoute
  .get('/', superAdminController.getAllSuperAdmin)
  .post('/', validations.validateCreate, superAdminController.createSuperAdmin);

export default superAdminRoute;

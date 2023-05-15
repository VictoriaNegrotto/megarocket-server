import { Router } from 'express';
import validations from '../validations/super-admins';
import superAdminController from '../controllers/super-admins';

const superAdminRoute = Router();

superAdminRoute
  .get('/', superAdminController.getAllSuperAdmin)
  .get('/:id', superAdminController.getSuperAdminById)
  .get('/filter/:emailFilter', superAdminController.getSuperAdminByEmail)
  .post('/', validations.validateCreate, superAdminController.createSuperAdmin)
  .put('/:id', validations.validateUpdate, superAdminController.updateSuperAdmin)
  .delete('/:id', superAdminController.deleteSuperAdmin);

export default superAdminRoute;

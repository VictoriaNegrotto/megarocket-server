import { Router } from 'express';
import validations from '../validations/super-admins';
import superAdminController from '../controllers/super-admins';
import verifyToken from '../middlewares/authMiddleware';

const superAdminRoute = Router();

superAdminRoute
  .get('/', verifyToken(['SUPERADMIN']), superAdminController.getAllSuperAdmin)
  .get('/:id', verifyToken(['SUPERADMIN']), superAdminController.getSuperAdminById)
  .get('/filter/:emailFilter', verifyToken(['SUPERADMIN']), superAdminController.getSuperAdminByEmail)
  .post('/', verifyToken(['SUPERADMIN']), validations.validateCreate, superAdminController.createSuperAdmin)
  .put('/:id', verifyToken(['SUPERADMIN']), validations.validateUpdate, superAdminController.updateSuperAdmin)
  .delete('/:id', verifyToken(['SUPERADMIN']), superAdminController.deleteSuperAdmin);

export default superAdminRoute;

import express from 'express';
import adminValidation from '../validations/admins';
import adminsControllers from '../controllers/admins';
import verifyToken from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', verifyToken(['SUPERADMIN']), adminsControllers.getAdmins);
router.post('/', verifyToken(['SUPERADMIN']), adminValidation, adminsControllers.createAdmin);
router.get('/:id', verifyToken(['SUPERADMIN']), adminsControllers.getAdminById);
router.put('/:id', verifyToken(['SUPERADMIN']), adminValidation, adminsControllers.updateAdmin);
router.delete('/:id', verifyToken(['SUPERADMIN']), adminsControllers.deleteAdmin);

export default router;

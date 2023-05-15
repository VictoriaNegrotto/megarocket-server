import express from 'express';
import adminValidation from '../validations/admins';
import adminsControllers from '../controllers/admins';

const router = express.Router();

router.get('/', adminsControllers.getAdmins);
router.post('/', adminValidation, adminsControllers.createAdmin);
router.get('/:id', adminsControllers.getAdminById);
router.put('/:id', adminValidation, adminsControllers.updateAdmin);
router.delete('/:id', adminsControllers.deleteAdmin);

export default router;

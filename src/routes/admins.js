import express from 'express';
import adminValidation from '../validations/admins';
import * as adminsController from '../controllers/admins';

const router = express.Router();

router.get('/:id', adminsController.getAdminById);
router.put('/:id', adminValidation, adminsController.updateAdmin);
router.delete('/:id', adminsController.deleteAdmin);

export default router;

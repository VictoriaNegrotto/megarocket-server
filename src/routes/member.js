import { Router } from 'express';
import memberController from '../controllers/member';
import validationsMember from '../validations/member';
import verifyToken from '../middlewares/authMiddleware';

const memberRouter = Router();
memberRouter.get('/', verifyToken(['ADMIN']), memberController.getMembers);
memberRouter.post('/', validationsMember.validateCreate, memberController.createMember);

memberRouter.get('/:id', verifyToken(['ADMIN', 'MEMBER']), memberController.getMemberById);
memberRouter.get('/filter/:nameMember', verifyToken(['ADMIN', 'MEMBER']), memberController.filterMember);
memberRouter.put('/:id', verifyToken(['ADMIN', 'MEMBER']), validationsMember.validateUpdate, memberController.updateMember);
memberRouter.delete('/:id', verifyToken(['ADMIN']), memberController.deleteMember);

export default memberRouter;

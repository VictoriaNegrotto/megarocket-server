import { Router } from 'express';
import memberController from '../controllers/member';
import validationsMember from '../validations/member';

const memberRouter = Router();
memberRouter.get('/', memberController.getMembers);
memberRouter.post('/', validationsMember.validateCreate, memberController.createMember);

memberRouter.get('/:id', memberController.getMemberById);
memberRouter.get('/filter/:nameMember', memberController.filterMember);
memberRouter.put('/:id', validationsMember.validateUpdate, memberController.updateMember);
memberRouter.delete('/:id', memberController.deleteMember);

export default memberRouter;

import { Router } from 'express';
import memberController from '../controllers/member';
import validationsMember from '../validations/member';

const memberRouter = Router();
memberRouter.get('/', memberController.getMembers);
memberRouter.post('/', validationsMember.validateCreate, memberController.createMember);

export default memberRouter;

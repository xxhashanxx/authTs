import { Router } from 'express';
import Controller from './role.controller';
import hasAuthPermission from '../../../middlewares/v1/authPermission'

const role: Router = Router();
const controller = new Controller();

role.get('/:userId',[hasAuthPermission],controller.findOne);


export default role;
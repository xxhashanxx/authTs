import { Router } from "express";
import Controller from './user.controller'
import hasAuthPermission from '../../../middlewares/v1/authPermission'
import hasRolePermission from '../../../middlewares/v1/rolePermission'
import { access } from "fs";

const user: Router = Router();
const controller = new Controller();

user.post('/create',[hasAuthPermission,hasRolePermission], controller.create);
user.post('/register', controller.register);
user.post('/login', controller.login);
export default user;
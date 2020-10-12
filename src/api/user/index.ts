import { Router } from 'express';
import user from './user/user.route';
import role from './roles/role.route';
const router: Router = Router();


router.use('/user', user);
router.use('/role',role);


export default router;
/* import * as responses from '../../helpers/responses.hander';

const hasRolePermission = async (req, res, next,aRole=[]): Promise<any> => {
    try {
        const role = req.headers['x-role'];

    } catch (error) {
        return res.status(401).send(responses.failed(error, 402));
    }
};
export default hasRolePermission; */

/* import permission from '../../security/permission'
const perm = permission.values;
export default function permit() {
    // return a middleware
    perm.permittedRoles
    return (req, res, next) => {
      const { user } = req
  
      if (user && permittedRoles.includes(user.role)) {
        next(); // role is allowed, so continue on the next middleware
      } else {
        res.status(403).json({message: "Forbidden"}); // user is forbidden
      }
    }
  } */

import { AccessControl } from 'accesscontrol';
import { string } from 'joi';
import * as responses from '../../helpers/responses.hander';
const ac = new AccessControl();
ac.grant('User')
        .resource('User')
        .readAny('User')
    .grant('Owner')                    // define new or modify existing role. also takes an array.
        .createOwn('User')             // equivalent to .createOwn('video', ['*'])
        .deleteOwn('User')
        .readAny('User')
        .createAny('User')
    .grant('Admin')                   // switch to another role without breaking the chain
        .extend('User')                 // inherit role capabilities. also takes an array
        .updateAny('User')  // explicitly defined attributes
        .deleteAny('User')
  
const hasRolePermission = async (req, res, next): Promise<any> => {

    try{
        const canRole = ac.can(req.headers['x-role']);
        console.log(canRole);
        console.log((req.headers['x-task']));
        const [access,what] = (req.headers['x-task']).split('.');
        console.log(canRole+"---"+access+"----"+what);
        switch(access){
            case 'createAny':
                if(canRole.createAny(what)){
                    next();
                }
                break;
            case 'createOwn':
                break;
            case 'delete':
                break;
            case 'deleteAny':
                break;
            case 'deleteOwn':
                break;
            case 'readAny':
                break;
            case 'readOwn':
                break;
            case 'resource':
                break;
            case 'role':
                break;
            case 'update':
                break;
            case 'UpdateAny':
                break;
        }
    }catch (error) {
        console.log('error in role permission')
        return res.status(401).send(responses.failed(error, 402));
    }

}
export default hasRolePermission;
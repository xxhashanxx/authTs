import Roles from './role';
const roles = Roles.values;

export default class Permission {
    static get values(){
        return{
            iamCreate:{
                id: 'iamCreate',
                allowedRoles:[
                    roles.admin,
                    roles.owner,
                    
                ],
                allowedStorageFolders: ['user'],
            },
            iamEdit: {
                id: 'iamEdit',
                allowedRoles: [
                  roles.owner,
                  roles.admin,
                  roles.dataEntry,
                ],
              },            
        }
    }
}
  
  
import {IRole} from './role.interface';
import * as db from '../../../app/db/database/models';
import {RolesEnum} from './roles.enum'
let Db =db.userRole;

export class Role implements IRole{
    id: string;
    role:[RolesEnum];
    userId:string;
    createdById:string;
    updatedById:string;
    constructor(payload?:any){
        Object.assign(this,payload);
    }

    async findAll(){

    }

    async findOne () {
        return new Promise(async (resolve, reject) => {
            Db.findAll( {where: {userId: this.userId}})
                .then(data => {resolve(data);})
                .catch(err => {reject(err); });
        });
    }

    async createTrans(role,t) {
        return new Promise(async (resolve, reject) => {
            console.log("*************************"+this.userId);
            
            if (!this.userId) {
                reject("user ID can not be empty!");
                return;
            }
            const body = {
                id: this.id,
                role: this.role,
                userId:this.userId,
                createdById:this.createdById,
                updatedById:this.updatedById,
            } 
            try{
                for(let val of role) {
                    const body = {
                        id: this.id,
                        role: val,
                        userId:this.userId,
                        createdById:this.createdById,
                        updatedById:this.updatedById,
                    };
        
                    let data = await Db.create(body,{transaction: t});
                    //console.log(data);
                   /*  var obj =data.dataValues;
                    resolve(obj); */
                }
                resolve();
            }
            catch(error){
                reject(error);
            }
            
        });
    }

    
}

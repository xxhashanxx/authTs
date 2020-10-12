import {IUser} from './user.interface';
import * as db from '../../../app/db/database/models';
import {Role} from '../roles/role.class';
import bcrypt from 'bcrypt';
import jwt = require('jsonwebtoken');
import {APP_CONFIG} from '../../../../src/config/app.config';
let Db = db.user;
let DbRole = db.userRole;
const Op =db.Sequelize;

export class User implements IUser{
    id: string;
    lastName:string;
    firstName:string;
    password:string;
    email:string;
    role:[string];
    createdById:string;
    
    constructor(payload?:any){
        Object.assign(this,payload);
    }

    async create(){
        return new Promise(async (resolve, reject) => {
            const t = await db.sequelize.transaction();
            try{
                const body = {
                    id: this.id,
                    lastName:this.lastName,
                    firstName:this.firstName,
                    password:this.password,
                    email:this.email,
                    createdById:this.createdById
                }
                let data = await Db.create(body,{transaction: t })
                let role = new Role({
                    userId: this.id,
                    createdById: this.createdById
                });
                await role.createTrans(this.role,t);
                await t.commit();
                //--------------------
                //let data1 = await this.getAllRms (this.id);
                var obj = data.dataValues;
                //obj["role"] = data1;
                //--------------------
                //var obj = data.dataValues;
                
                resolve(obj);
            }
            catch(error){
            console.log(error);
            await t.rollback();
            reject(error); 
            }        
        });

    }
    async login(){
        return new Promise(async (resolve, reject) => {
            try{
                const email = this.email
                let user = await Db.findOne(
                    { where: { email } }
                );
                if (!user) {
                    reject("Incorrect email");
                }
                //console.log(user.dataValues)
                const passwordsMatch = await bcrypt.compare(
                    this.password,
                    user.dataValues.password,
                );
                if (!passwordsMatch) {
                    reject("Incorrect Password");
                }
                if (!user) {
                    reject("Incorrect email");
                }
                let userId =user.dataValues.id
                let token = jwt.sign(
                    { id: user.dataValues.id },
                    APP_CONFIG.authJwtSecret,
                    {expiresIn:'24h'}
                  );
                let data = await DbRole.findOne(
                    { where: {userId } }
                );
                
                var obj = user.dataValues;
                obj['token']=token;
                obj['role']=data.dataValues.role
                resolve(obj);
            }
            catch(error){
                reject(error);
            }
        });
    }
    async findOneByEmail () {
        return new Promise(async (resolve, reject) => {
            try{
                const email = this.email
                let data = await Db.findOne(
                    
                    { where: { email } }
                );
                //console.log(data)
                var obj;
               if (data !=undefined){
                    obj = data.dataValues;
               }
               resolve(obj);
               return data;
            }
            catch(error){
                reject(error);
            } 
        });
    }
    async findOneById () {
        return new Promise(async (resolve, reject) => {
            try{
                let data = await Db.findOne(
                    this.id
                );
                //console.log(data)
                var obj;
               if (data !=undefined){
                    obj = data.dataValues;
                    obj["role"]= await this.getUserRole(this.id);
               }
               resolve(obj);
            }
            catch(error){
                reject(error);
            } 
        });
    }
    async getUserRole (userId) {
        return new Promise(async (resolve, reject) => {
            DbRole.findAll( {where: {userId: userId}})
                .then(data => {resolve(data);})
                .catch(err => {reject(err); });
        });
    }

    /* async getAllRms (id) {
        return new Promise(async (resolve, reject) => {
            db.sequelize.query(`SELECT rm_id,manager_name FROM relationship_managers WHERE rm_id IN (
                SELECT userId FROM userroles WHERE id = '`+id+`')`,{ type: db.sequelize.QueryTypes.SELECT})
                .then(data => {resolve(data);})
                .catch(err => {reject(err); });
        });
    } */
}


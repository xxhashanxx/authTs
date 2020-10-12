import { Request, Response } from 'express';
import * as responses from '../helpers/response.header';
import { User} from './user.class';
import bcrypt from 'bcrypt';

var path = require('path');
var appDir = path.dirname(require.main.filename);
const fs = require('fs');
const BCRYPT_SALT_ROUNDS = 12;
export default class UserController{
    public create =async(req,res,next) : Promise<any> =>{
        console.log(req.body);
        // check for exsisting user for this
        let createdById;
        const {id,
            lastName,
            firstName,
            email,
            role} = req.body;
        if(req.headers['x-user-id']){
            createdById =req.headers['x-user-id']
        }else{
            createdById=null;
        };
        const password = await bcrypt.hash(
                req.body.password,
                BCRYPT_SALT_ROUNDS,
              );        
        let Service = new User({
            id: id,
            lastName:lastName,
            firstName:firstName,
            password:password,
            email:email,
            role:role,
            createdById:createdById
        });
        
        await Service.create()
            .then(data => {
                res.status(200).send(responses.successWithPayload('list', data));
            })
            .catch(err =>{next(err)} );       
    };
    public register= async (req, res,next) : Promise<any> =>{
        // check for exsisting user for this
        this.create(req,res,next);

    }
    public login= async (req, res,next) : Promise<any> =>{
        const {email,
            password,
            } = req.body;
            let Service = new User({
                email: email,
                password:password
            });
            await Service.login()
                .then(data => {
                    //console.log(responses.successWithPayload('list', data).data.token)
                    res.header('x-authorization',responses.successWithPayload('list', data).data.token);
                    res.header('x-user-id',responses.successWithPayload('list', data).data.id)
                    res.header('x-role',responses.successWithPayload('list', data).data.role)
                    res.status(200).send(responses.successWithPayload('list', data));
                })
                .catch(err =>{next(err)} ); 
        
    }

    public findByEmail = async (req, res,next) : Promise<any> =>{
        let Service = new User({
            email: req.params.email,
        });

        await Service.findOneByEmail()
            .then(data => {
                res.status(200).send(responses.successWithPayload('list', data));
            })
            .catch(err =>{next(err)} );  
        
    };

}
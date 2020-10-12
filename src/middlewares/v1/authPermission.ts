import { APP_CONFIG } from '../../config/app.config';
import { Request, Response } from "express";
import * as responses from '../../helpers/responses.hander';
const rp = require('request-promise');

const hasAuthPermission = async (req, res, next): Promise<any> => {
    /* try {
        const task = req.headers['x-task'];
        const role = req.headers['x-role'];
        const user_id = req.headers['x-user-id'];
        const authorization = req.headers['x-authorization'];
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        //'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        var options = { 
            method: 'GET',
            url: APP_CONFIG.config.auth_module_url,
            headers: {
                "x-authorization":authorization,
             //"x-task":task,
                "x-user-id":user_id,
                "x-role":role
            },
            
            
            json: true };
            console.log(options);
            await rp(options)
                .then((apiResponse) => {
                    console.log(apiResponse);
                    
                })
                .catch((err) => {
                    console.log("???????????????????????")
                    return res.status(401).send(responses.failed(err.error.errorCode.toString(), 402));
                });
    } catch (error) {
        return res.status(401).send(responses.failed(error, 402));
    } */
    try{
        console.log("in authPermissionCheck")
        if(req.headers['x-authorization']){
            
            return next();
        }else{
            return res.status(401);
        }

    }catch (error) {
        console.log('error in auth permission')
        return res.status(401).send(responses.failed(error, 402));
    }
    
};

export default hasAuthPermission;

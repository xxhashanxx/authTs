import * as httpStatus from 'http-status';
//import { ValidationError } from 'express-validation';
import * as responses from './responses.hander';
//import { string } from 'joi';
//import ErrorCodes from '../config/error.codes';

// handle not found errors
/*export const notFound = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).send({
    success: false,
    errorCode: ErrorCodes.REQUESTED_RESOURCE_NOT_FOUND,
    message: 'Requested Resource Not Found'
  });
};*/

// handle internal server errors
/*export const internalServerError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(err.status).json({
      success: false,
      //errorCode: ErrorCodes.FIELD_VALIDATION_ERRORS,
      statusCode: err.status,
      errors: err.errors
    });
  }
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).send({
    success: false,
    //errorCode: ErrorCodes.INTERNAL_ERROR,
    message: err.message
  });
};*/

// handle bad request errors
/*export const badRequest = (err, req, res, next) => {
  res.status(err.status || httpStatus.BAD_REQUEST).send({
    success: false,
    //errorCode: ErrorCodes.BAD_REQUEST,
    message: err.errors
  });
};*/
function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

export function erroHandler(error, req, res, next){
      var msg;
      console.log('##fffffffffffffffffffffff');
      console.log(error);
      res.status(error.status||500);
      if(error.name!= undefined){
        if(error.name =="SequelizeUniqueConstraintError"){
          if(error.errors!= undefined){
            msg ="ID "+error.errors[0].value+" already exist.";
          }
        }
        if(error.name =="SequelizeForeignKeyConstraintError"){
          if(error.parent!= undefined){
            if (error.parent['code'] =="ER_ROW_IS_REFERENCED_2"){
              msg ="Object is already connected to other places";
            }
            if (error.parent['code'] =="ER_NO_REFERENCED_ROW_2"){
              var str = (error['fields']).toString();
              str = (str).replace('_id', '');
              msg = str[0].toUpperCase()+str.slice(1)+' ' +error['value']+" does not exist";
            }
          }
        }
        if(error.name =="SequelizeDatabaseError"){
          if(error.parent!= undefined){
            if (error.parent['code'] =="ER_DATA_TOO_LONG"){
              msg = error.parent['sqlMessage'];
            }
            else if (error.parent['code'] =="ER_TRUNCATED_WRONG_VALUE_FOR_FIELD"){
              msg = error.parent['sqlMessage'];
            }
            else
            {
              msg = error.parent['sqlMessage'];
            }
            /*if (error.parent['code'] =="ER_NO_REFERENCED_ROW_2"){
              var str = (error['fields']).toString();
              str = (str).replace('_id', '');
              msg = str[0].toUpperCase()+str.slice(1)+' ' +error['value']+" does not exist";
            }*/
          }
        }
      }
      if(msg==null)
      {
        msg = JSON.stringify(error);
        if(msg==='{}'){
          msg = error.stack.toString();
        }
      }
      return res.status(400).send(responses.failed(msg));
  };



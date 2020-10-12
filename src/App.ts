import * as bodyParser from 'body-parser';
import cors from 'cors';
//import * as express from 'express';
import express from 'express';

import apiUser from './api/user/index';
import * as errorHandler from './helpers/error.handler';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));

  }

  private setRoutes(): void {
    this.express.use('/api/user', apiUser);
    this.express.use('/healthz', async (req, res) => {

      res.status(200).send('Doctor Appoinment Resource Module up and running');
    });
  }

  private catchErrors(): void {
    //TODO
    // Handle errors
    this.express.use((req, res, next)=>{
      const error = new Error('Not Found1');
      //error.status(04);
      next(error);
    }
    );

    this.express.use((error, req, res, next)=>{
      return errorHandler.erroHandler(error, req, res, next);
      //error.status(04);
      /*var msg;
      res.status(error.status||500);
      if(error.errors[0].validatorKey =="not_unique"){
        msg ="ID "+error.errors[0].value+" already exist.";
      }
      //console.log(res);
      //console.log(req.data);
      res.json({
        error:{
          message:msg
        }
      });*/
    }
    );
  }
}

export default new App().express;

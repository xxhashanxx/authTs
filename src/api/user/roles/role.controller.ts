import * as responses from '../helpers/response.header';
import { Role} from './role.class';

export default class CustomerRmController {
    public findOne= async (req, res,next) : Promise<any> =>{
        console.log(req.body)
        let Service = new Role({
            userId: req.params.userId,
        });

        await Service.findOne()
            .then(data => {
                res.status(200).send(responses.successWithPayload('list', data));
            })
            .catch(err =>{next(err)} );  
        
    };

}
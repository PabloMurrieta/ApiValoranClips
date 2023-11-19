import { Request, Response, NextFunction} from "express"
import { validationResult,  } from "express-validator"


const validarCampos = (req:Request, res:Response, next:NextFunction) =>{

    //Si hay errores devolver errors que fueron encontrados pos express validator
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    next();

}

export default validarCampos
import { check } from "express-validator";
import {Router} from 'express'

import { addRank, 
         deleteRank, 
         getAllRanks, 
         getRankById, 
         putRank} from "../controllers/rankController.js";

import validarCampos from "../middlewares/validarCampos.js";
import { checkIfRankExists } from "../helpers/db-validators.js";


const rankRouter = Router();

//all ranks
rankRouter.get('/',getAllRanks);
//rank by id
rankRouter.get('/:id',[

    check('id', 'El id debe ser un id valido').isMongoId(),
    validarCampos

],getRankById);

rankRouter.post('/',[

    check('rango','El rango es necesario').notEmpty().isString(),
    check('rango').custom(checkIfRankExists),
    validarCampos
    
],addRank);

rankRouter.put('/:id',[

    check('rango').custom(checkIfRankExists),
    validarCampos

],putRank);

rankRouter.delete('/:id',[
 
    check('id', 'El id debe ser un id valido').isMongoId(),
    validarCampos

],deleteRank);



export default rankRouter
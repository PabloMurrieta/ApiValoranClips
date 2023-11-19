import { Router } from "express";
import { check } from "express-validator";

import { addUser,
         deleteUser,
         getUserByID, 
         getUsers, 
         putUser} from "../controllers/userControllers.js";

import { validateJWT } from "../middlewares/validate-JWT.js";
import   validarCampos from "../middlewares/validarCampos.js";
import { checkIfUserExists, checkIfUserNoExists,  } from "../helpers/db-validators.js";



const userRouter = Router();


userRouter.get('/',[

    validateJWT,

],getUsers);

userRouter.get('/:id',[

    validateJWT,
    check('name').custom(checkIfUserNoExists),
    check('id', 'El debe ser un id valido').isMongoId(),
    validarCampos

],getUserByID);

userRouter.post('/',[

    validateJWT,
    check('name','El campo name es obligatirio').notEmpty().isString(),
    check('name').custom(checkIfUserExists),
    check('password','El campo passwword es obligatirio').notEmpty().isString,
    check('rank','El campo rango es obligatirio').notEmpty().isString(),//Falta validar los campos que se pueden agregar
    validarCampos

],addUser);

userRouter.put('/:id',[

    validateJWT,
    check('name').custom(checkIfUserNoExists).isString(),
    check('id', 'El debe ser un id valido').isMongoId(),
    validarCampos

],putUser);

userRouter.delete('/:id',[

    validateJWT,
    check('name').custom(checkIfUserNoExists),
    check('id', 'El debe ser un id valido').isMongoId(),
    validarCampos

],deleteUser);

export default userRouter

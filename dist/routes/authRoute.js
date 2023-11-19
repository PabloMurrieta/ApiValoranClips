import { Router } from "express";
import { check } from "express-validator";
import { login, newUser } from "../controllers/authController.js";
import { checkIfRankExists } from "../helpers/db-validators.js";
import validarCampos from "../middlewares/validarCampos.js";
const authRoute = Router();
authRoute.post('/login', [
    check('name').isString(),
    check('password').isString(),
], login);
authRoute.post('/', [
    check('rango', 'El rango es necesario').notEmpty().isString(),
    check('rango').custom(checkIfRankExists),
    validarCampos
], newUser);
export default authRoute;
//# sourceMappingURL=authRoute.js.map
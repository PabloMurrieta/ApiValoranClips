var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcryprjs from "bcryptjs";
import User from "../models/user.js";
import generarJWT from "../helpers/generateJWT.js";
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    try {
        const user = yield User.findOne({ name }); //Le damos el valor del usuario quee se supone que debe estar ya validada su data
        if (!user) { //Verificamos 
            return res.status(400).json({ msg: 'El usuario no existe' });
        }
        const validPassword = bcryprjs.compareSync(password, (user === null || user === void 0 ? void 0 : user.password) || '');
        if (!validPassword) { //Verificamos 
            return res.status(400).json({ msg: ' User/password no son correctos- paassword' });
        }
        const token = yield generarJWT(user.id);
        res.json({ user, token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hubo un error en la validacion , hable con administrador' });
    }
});
export const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, rank, password } = req.body;
    const newUser = new User({ name, rank, password });
    try {
        yield newUser.save();
        res.json({ newUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al agregar el registro' });
    }
});
//# sourceMappingURL=authController.js.map
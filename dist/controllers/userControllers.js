var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user.js";
export const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        res.json({ users });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios de la base de datos' });
    }
});
export const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Usar populate para obtener la información del rango
        const user = yield User.findById(id).populate({
            path: 'rank',
            select: 'rango img', // Especifica los campos que deseas cargar
        });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar el usuario por ID' });
    }
});
export const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
export const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, rank, password } = req.body;
    try {
        const user = yield User.findById(id);
        yield (user === null || user === void 0 ? void 0 : user.updateOne({ name, rank, password }));
        res.status(200).json({ msg: `Actulizacion de usuario exitosa ` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al actulizar el registro' });
    }
});
export const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield User.findById(id);
        yield (user === null || user === void 0 ? void 0 : user.updateOne({ status: false }));
        res.status(200).json({ msg: `Usuario con ${id} borrado exitosamente` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al eliminar el registro' });
    }
});
//# sourceMappingURL=userControllers.js.map
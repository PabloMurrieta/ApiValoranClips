var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Rank from "../models/rank.js";
export const addRank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rango } = req.body;
    try {
        const newRank = new Rank({ rango });
        yield newRank.save();
        res.json({ newRank });
    }
    catch (error) {
    }
});
export const getAllRanks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ranks = yield Rank.find();
        res.json({ ranks });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los rangos de la base de datos' });
    }
});
export const getRankById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const rank = yield Rank.findById(id);
        if (!rank) {
            return res.status(404).json({ error: 'rank no encontrado' });
        }
        res.json({ rank });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al buscar el registro' });
    }
});
export const putRank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { img, rango } = req.body;
    try {
        const Nrank = yield Rank.findById(id);
        yield (Nrank === null || Nrank === void 0 ? void 0 : Nrank.updateOne({ img, rango }));
        res.status(200).json({ msg: `Actulizacion de RANK exitosa `, Nrank });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al actulizar el registro' });
    }
});
export const deleteRank = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const Nrank = yield Rank.findById(id);
        yield (Nrank === null || Nrank === void 0 ? void 0 : Nrank.updateOne({ status: false }));
        res.status(200).json({ msg: `Usuario con ${id} borrado exitosamente` });
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al eliminar  usuario en la base de datos');
    }
});
//# sourceMappingURL=rankController.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Clip from "../models/clip.js";
export const addClip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, url, userID } = req.body;
    try {
        const clip = new Clip({ title, description, url, userID });
        yield clip.save();
        res.status(200).json({ msg: 'El clip fue subido correctamente' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al subir clip' });
    }
});
//Falta paginacion
export const getClips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clips = yield Clip.find().populate({
            path: 'userID',
            select: 'name rango'
        });
        res.status(200).json({ clips });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo en error al hacer la consulta a la BD' });
    }
});
export const getClipById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const clip = yield Clip.findById(id).populate({
            path: 'userID',
            select: 'name rank'
        });
        res.status(200).json({ clip });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al hacer la peticion ' });
    }
});
export const putClip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, description } = req.body;
    try {
        const clip = yield Clip.findById(id);
        yield (clip === null || clip === void 0 ? void 0 : clip.updateOne({ title, description }));
        res.status(200).json({ msg: 'actulizacion exitosa' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al hacer la la actulizacion ' });
    }
});
export const deleteClip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const clip = yield Clip.findById(id);
        yield (clip === null || clip === void 0 ? void 0 : clip.updateOne({ status: false }));
        res.status(200).json({ msg: `Clip con ${id} borrado exitosamente` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Hubo un error al eliminar el registro' });
    }
});
//# sourceMappingURL=clipController.js.map
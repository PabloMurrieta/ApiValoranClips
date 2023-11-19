import { Router } from "express";
import { check } from "express-validator";
import { addClip, deleteClip, getClipById, getClips, putClip } from "../controllers/clipController.js";
import validarCampos from "../middlewares/validarCampos.js";
const clipRouter = Router();
clipRouter.get('/', getClips);
clipRouter.get('/:id', [
    check('id', 'Debe ser un di valido').isMongoId(),
    validarCampos
], getClipById);
clipRouter.post('/', [
    check('title', 'El title es obligarotio').notEmpty(),
    check('url', 'La url es obligatoria').notEmpty(),
    check('userID', 'El userID es obligatorio').notEmpty(),
    validarCampos
], addClip);
clipRouter.put('/:id', [
    check('id', 'Debe ser un di valido').isMongoId(),
    validarCampos
], putClip);
clipRouter.delete('/:id', [
    check('id', 'Debe ser un di valido').isMongoId(),
    validarCampos
], deleteClip);
export default clipRouter;
//# sourceMappingURL=clipRoute.js.map
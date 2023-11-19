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
//-User-----------------------------------------------------------------
export const checkIfUserExists = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield User.findOne({ name });
    if (existingUser) {
        throw new Error('El usuario ya existe');
    }
});
export const checkIfUserNoExists = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield User.findOne({ id });
    if (!existingUser) {
        throw new Error('El usuario no existe');
    }
});
//--Rank--------------------------------------------------------------------
export const checkIfRankExists = (rango) => __awaiter(void 0, void 0, void 0, function* () {
    const existingRank = yield User.findOne({ rango });
    if (existingRank) {
        throw new Error('El rnk ya existe');
    }
});
export const checkIfRankNoExists = (rango) => __awaiter(void 0, void 0, void 0, function* () {
    const existingRank = yield User.findOne({ rango });
    if (!existingRank) {
        throw new Error('El rank no existe');
    }
});
//# sourceMappingURL=db-validators.js.map
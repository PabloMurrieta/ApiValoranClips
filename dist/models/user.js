var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    rank: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Rank',
        required: [true, 'El rango es obligatorio']
    },
    status: {
        type: Boolean,
        default: true
    }
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            next();
        }
        // Asegurarse de que this.password tenga un valor antes de hashear
        if (typeof this.password === 'string') {
            const saltRounds = yield bcrypt.genSalt(10);
            this.password = yield bcrypt.hash(this.password, saltRounds);
        }
        next();
    });
});
userSchema.methods.toJson = function () {
    const _a = this.toObject(), { __v, _id } = _a, user = __rest(_a, ["__v", "_id"]);
    user.uid = _id;
    return user;
};
const User = mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=user.js.map
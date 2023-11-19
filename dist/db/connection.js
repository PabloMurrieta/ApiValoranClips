var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import 'dotenv/config';
const conectarDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.MONGODB_CNN) {
            throw new Error("La variable de entorno MONGODB_CNN no está definida.");
        }
        yield mongoose.connect(process.env.MONGODB_CNN, {
            dbName: 'valoran'
        });
        console.log('Base de datos online');
    }
    catch (error) {
        console.error(error);
        throw new Error('Error al inicializar la base de datos');
    }
});
export default conectarDB;
//# sourceMappingURL=connection.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express, { application } from 'express';
import cors from 'cors';
import rankRouter from '../routes/rankRoute.js';
import userRouter from '../routes/userRoutes.js';
import conectarDB from '../db/connection.js';
import authRoute from '../routes/authRoute.js';
import clipRouter from '../routes/clipRoute.js';
// import conectarDB from '../db/conexion';
class servidor {
    constructor() {
        this.app = application;
        this.apiPath = {
            auth: '/auth',
            clips: '/clips',
            ranks: '/ranks',
            users: '/users',
        };
        this.connectDB = () => __awaiter(this, void 0, void 0, function* () {
            yield conectarDB();
        });
        //Variable de servidor
        this.app = express();
        //Puerto
        this.port = process.env.PORT || '8081';
        //Middleares
        this.middlewares();
        //Conexion Db
        this.connectDB();
        this.routes();
    }
    middlewares() {
        //Cors
        this.app.use(cors());
        //Parseo del body
        this.app.use(express.json());
        //Carpeta publica
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.apiPath.auth, authRoute);
        this.app.use(this.apiPath.users, userRouter);
        this.app.use(this.apiPath.clips, clipRouter);
        this.app.use(this.apiPath.ranks, rankRouter);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`El servidor est corriendo en el puerto ${this.port}`);
        });
    }
}
export default servidor;
//# sourceMappingURL=server.js.map
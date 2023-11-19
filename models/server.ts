
import express, { application } from 'express';
import cors from 'cors'

import rankRouter from '../routes/rankRoute.js';
import userRouter from '../routes/userRoutes.js';
import conectarDB from '../db/connection.js';
import authRoute from '../routes/authRoute.js';
import clipRouter from '../routes/clipRoute.js';

// import conectarDB from '../db/conexion';



class servidor {

    private app = express();
    private port : string;
    private apiPath = {

        auth:'/auth',
        clips:'/clips',
        ranks:'/ranks',
        users:'/users',
        

    }

    constructor(){
       
        //Variable de servidor
        this.app ;

        //Puerto
        this.port = process.env.PORT || '8081';
        //Middleares
        this.middlewares();

        //Conexion Db
        this.connectDB();

        this.routes();
    }

    connectDB = async () => {
        await conectarDB();
      };


    middlewares(){

        //Cors
        this.app.use(cors());
        //Parseo del body
        this.app.use(express.json())
        //Carpeta publica
        this.app.use(express.static('public'))

    } 

    routes(){

        this.app.use(this.apiPath.auth, authRoute);
        this.app.use(this.apiPath.users, userRouter);
        this.app.use(this.apiPath.clips,clipRouter);
        this.app.use(this.apiPath.ranks,rankRouter);
    }

    

    listen(){

        this.app.listen(this.port, ()=>{
            console.log(`El servidor est corriendo en el puerto ${this.port}`);
        })
    }
    

    
}

export default servidor
import mongoose from "mongoose";
import 'dotenv/config';


const conectarDB = async () => {
    try {
        if (!process.env.MONGODB_CNN) {
            throw new Error("La variable de entorno MONGODB_CNN no está definida.");
        }

        await mongoose.connect(process.env.MONGODB_CNN, {
            dbName: 'valoran'
        });

        console.log('Base de datos online');
    } catch (error) {
        console.error(error);
        throw new Error('Error al inicializar la base de datos');
    }
}

export default conectarDB;
import { Request, Response } from "express";
import User from "../models/user.js";


export const getUsers = async (req: Request, res: Response) => {

    try {
        const users = await User.find();
        res.json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios de la base de datos' });
    }


}

export const getUserByID = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        // Usar populate para obtener la información del rango
        const user = await User.findById(id).populate({
            path: 'rank',
            select: 'rango img', // Especifica los campos que deseas cargar
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar el usuario por ID' });
    }
};


export const addUser = async (req: Request, res: Response) => {

    const { name, rank, password } = req.body;
    const newUser = new User({ name, rank, password });

    try {

        await newUser.save();

        res.json({ newUser })

    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Hubo un error al agregar el registro'})
    }
}


export const putUser = async (req: Request, res: Response) => {

    const id = req.params.id;
    const { name, rank, password } = req.body;

    try {
        
    const user = await User.findById(id);
    await user?.updateOne({ name, rank, password })

    res.status(200).json({msg:`Actulizacion de usuario exitosa `})

    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Hubo un error al actulizar el registro'})
    }

}


export const  deleteUser = async(req:Request, res:Response) =>{

    const id = req.params.id;
    try {

        const user = await User.findById(id);

        await user?.updateOne({status:false});
    
        res.status(200).json({msg:`Usuario con ${id} borrado exitosamente`})
        
    }catch (error) {
        console.error(error);
        res.status(500).json({msg:'Hubo un error al eliminar el registro'})
    }
}


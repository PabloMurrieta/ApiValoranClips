
import { Response, Request } from "express";
import bcryprjs from "bcryptjs"
import User from "../models/user.js";
import generarJWT from "../helpers/generateJWT.js";
 

export const login = async (req:Request, res:Response)=>{

    const {name,password} = req.body
    try {
    
        const user = await User.findOne({name});//Le damos el valor del usuario quee se supone que debe estar ya validada su data
        if(!user){//Verificamos 
            return res.status(400).json({msg:'El usuario no existe'});
        }

        const validPassword = bcryprjs.compareSync(password, user?.password || '' );
        if(!validPassword){//Verificamos 
            return res.status(400).json({msg:' User/password no son correctos- paassword'});           
        }

        const token = await generarJWT(user.id)

        res.json({user, token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Hubo un error en la validacion , hable con administrador'})
    }
}

export const newUser = async (req: Request, res: Response) => {

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
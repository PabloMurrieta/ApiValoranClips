import { Request, Response } from "express";
import Clip from "../models/clip.js";
import { body, param } from "express-validator";


export const addClip = async (req:Request, res:Response)=>{
    
    const {title, description,url, userID} = req.body;

    try {
        const clip = new Clip({title, description,url, userID});

        await clip.save();
        res.status(200).json({msg:'El clip fue subido correctamente'})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error al subir clip'})
    }
}

//Falta paginacion
export const getClips = async (req:Request, res:Response)=>{
   
    try {
        const clips = await Clip.find().populate({
            path:'userID',
            select:'name rango'
        })

        res.status(200).json({clips})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo en error al hacer la consulta a la BD'})
    }
}

export const getClipById = async (req:Request, res:Response)=>{

    const id = req.params.id;

    try {
        
    const clip = await Clip.findById(id).populate({
        path:'userID',
        select:'name rank'
    })
    res.status(200).json({clip})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error al hacer la peticion '})
    }
}

export const putClip =async (req:Request, res:Response) => {

    const id = req.params.id;
    const {title,description} = req.body;

    try {      
        const clip = await Clip.findById(id);

        await clip?.updateOne({title,description});
        res.status(200).json({msg:'actulizacion exitosa'})

    }catch (error) {
        console.log(error);
        res.status(500).json({msg:'Hubo un error al hacer la la actulizacion '})
    }

}

export const  deleteClip = async(req:Request, res:Response) =>{

    const id = req.params.id;
    try {

        const clip = await Clip.findById(id);

        await clip?.updateOne({status:false});
    
        res.status(200).json({msg:`Clip con ${id} borrado exitosamente`})
        
    }catch (error) {
        console.error(error);
        res.status(500).json({msg:'Hubo un error al eliminar el registro'})
    }
}
    


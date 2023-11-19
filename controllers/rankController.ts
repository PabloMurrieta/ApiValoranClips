import {  Request, Response } from "express";
import Rank from "../models/rank.js";
import { Collection } from "mongoose";
import fs from "fs";
import Path  from "express";


export const addRank = async (req :Request, res : Response) => {

    const {rango} = req.body;

    try {
        const newRank = new Rank({rango});
        await newRank.save()
    
        res.json({newRank});  
    } catch (error) {
        
    }
 }

 export const getAllRanks = async (req:Request, res:Response) => {
    try {
        const ranks = await Rank.find();
        res.json({ ranks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los rangos de la base de datos' });
    }
};

export const getRankById =async (req :Request, res : Response) => {
    
   
        const id = req.params.id;

        try {
        const rank = await Rank.findById(id);

        if (!rank) {
            return res.status(404).json({ error: 'rank no encontrado' });
        }

        res.json({ rank });
            
        }catch (error) {
            console.error(error);
            res.status(500).json({msg:'Hubo un error al buscar el registro'})
        }
    
}

export const putRank = async (req: Request, res: Response) => {

    const id = req.params.id;
    const { img, rango } = req.body;

    try {
        
    const Nrank = await Rank.findById(id);
    await Nrank?.updateOne({ img, rango  })

    res.status(200).json({msg:`Actulizacion de RANK exitosa `, Nrank})

    } catch (error) {
        console.error(error);
        res.status(500).json({msg:'Hubo un error al actulizar el registro'})
    }

}

export const  deleteRank = async(req:Request, res:Response) =>{

    const id = req.params.id;
    try {

        const Nrank = await Rank.findById(id);

        await Nrank?.updateOne({status:false});
    
        res.status(200).json({msg:`Usuario con ${id} borrado exitosamente`})
        
    }catch (error) {
        console.error(error);
        throw new Error('Error al eliminar  usuario en la base de datos');
    }
}


        


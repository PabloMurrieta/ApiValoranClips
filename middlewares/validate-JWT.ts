

import { NextFunction, Request, Response } from "express";
import { Jwt } from "jsonwebtoken";


export const validateJWT = (req:Request, res:Response, next: NextFunction) =>{
    next();
    return

    const token = req.header('x-token');

    try {
        if(!token){
            return res.status(401).json({msg:'No hay token en la paticion'})
        }

    } catch (error) {
        console.log(error);
        res.status(401).json({msg:''})
    }
    
}
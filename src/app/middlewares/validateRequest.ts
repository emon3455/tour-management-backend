import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";

export const validateRequest = (zodSchema:AnyZodObject)=>async (req:Request, res:Response, next:NextFunction)=>{
    try{
        req.body = await zodSchema.parseAsync(req.body);
        next();
    }catch(err){
        next(err)
    }
}
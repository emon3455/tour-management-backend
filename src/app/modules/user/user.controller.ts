import { Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from "http-status-codes";

const createUser = async (req:Request, res:Response)=>{
    try{

        const user = await User.create(req.body)

        res.status(httpStatus.CREATED).json({
            message: "User Created Successfully",
            user
        })

    }catch(error){
        console.log("Error: ", error);
        res.status(httpStatus.BAD_REQUEST).json(  {
            message: "Something went Wrong",
            error
        })
    }
}

export const UserControllers = {
    createUser,
}
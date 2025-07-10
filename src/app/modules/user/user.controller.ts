import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res,{
        success: true,
        status: httpStatus.CREATED,
        data: user,
        message: "User Created Successfully",
    })
})

const getAllUser = catchAsync(async(req:Request, res:Response, next:NextFunction)=>{
    const users = await UserServices.getAllUser();
    
    sendResponse(res,{
        success: true,
        status: httpStatus.OK,
        message: "All Users Retrived Successfully!",
        data: users,
        meta: {total: users?.length}
    })
})

export const UserControllers = {
    createUser,
    getAllUser
}
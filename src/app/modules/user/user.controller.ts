import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res,{
        success: true,
        status: httpStatus.CREATED,
        data: user,
        message: "User Created Successfully",
    })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    // const token = req.headers.authorization
    // const verifiedToken = verifyToken(token as string, envVariable.JWT_ACCESS_SECRET) as JwtPayload

    const verifiedToken = req.user;

    const payload = req.body;
    const user = await UserServices.updateUser(userId, payload, verifiedToken)

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "User Updated Successfully",
        data: user,
    })
})

const getAllUser = catchAsync(async(req:Request, res:Response)=>{
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
    getAllUser,
    updateUser
}
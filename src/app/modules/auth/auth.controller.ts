import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthServices.credentialsLogin(req.body);

    sendResponse(res,{
        success: true,
        status: httpStatus.OK,
        data: user,
        message: "User Loged In Successfully",
    })
})

export const AuthController = {
    credentialsLogin
}
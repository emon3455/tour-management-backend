import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";
import { createUserTokens } from "../../utils/userToken";
import { envVariable } from "../../config/env";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
    const user = await AuthServices.credentialsLogin(req.body);

    setAuthCookie(res, user);

    sendResponse(res,{
        success: true,
        status: httpStatus.OK,
        data: user,
        message: "User Loged In Successfully",
    })
})

const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "No refresh token recieved from cookies")
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)

    setAuthCookie(res, tokenInfo);

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "New Access Token Retrived Successfully",
        data: tokenInfo,
    })
})

const logout = catchAsync(async (req: Request, res: Response) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "User Logged Out Successfully",
        data: null,
    })
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {

    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user

    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload);

    sendResponse(res, {
        success: true,
        status: httpStatus.OK,
        message: "Password Changed Successfully",
        data: null,
    })
})

const googleCallbackController = catchAsync(async (req: Request, res: Response) => {

    let redirectTo = req.query.state ? req.query.state as string : ""

    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1)
    }

    const user = req.user;
    console.log("user: ",user);
    

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }

    const tokenInfo = createUserTokens(user)

    setAuthCookie(res, tokenInfo)

    // sendResponse(res, {
    //     success: true,
    //     statusCode: httpStatus.OK,
    //     message: "Password Changed Successfully",
    //     data: null,
    // })

    res.redirect(`${envVariable.FRONTEND_URL}/${redirectTo}`)
})

export const AuthController = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController
}
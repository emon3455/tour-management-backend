import { NextFunction, Response, Request } from "express";
import { envVariable } from "../config/env";
import AppError from "../errorHelpers/AppError";

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    let status = 500;
    let message = `Something Went Wrong!`;

    if(error instanceof AppError){
        status = error.statusCode;
        message = error.message;
    }else if(error instanceof Error){
        status = 500;
        message = error.message;
    }

    res.status(status).json({
        success: false,
        message,
        error,
        stack: envVariable.NODE_ENV === "development" ? error.stack : null
    })
}
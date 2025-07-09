import { NextFunction, Response, Request } from "express";
import { envVariable } from "../config/env";

export const globalErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    const status = 500;
    const message = `Something Went Wrong! ${error?.message}`;
    res.status(status).json({
        success: false,
        message,
        error,
        stack: envVariable.NODE_ENV === "development" ? error.stack : null
    })
}
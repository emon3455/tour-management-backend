import { Response } from "express";

interface TMeta {
    total: number
}

interface TResponse<T>{
    success: boolean;
    status: number;
    message: string;
    data: T;
    meta ?:TMeta;
}

export const sendResponse = <T>(res:Response, data:TResponse<T>)=>{
    res.status(data.status).json({
        success: data.success,
        statusCode: data.status,
        message: data.message,
        data: data.data,
        meta: data.meta
    })
}
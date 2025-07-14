import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { envVariable } from "../config/env";

const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
        throw new AppError(403, "No Token Received")
    }

    const verifiedToken = verifyToken(accessToken, envVariable.JWT_ACCESS_SECRET) as JwtPayload

    if (!authRoles.includes(verifiedToken.role)) {
        throw new AppError(403, "You are not permitted to view this route!!")
    }

    next()

}

export default checkAuth;
import { Response } from "express";

export interface AuthTokens {
    accessToken?: string;
    refreshToken?: string;
}

export const setAuthCookie = (res: Response, user: AuthTokens) => {
    
    if (user.accessToken) {
        res.cookie("accessToken", user.accessToken, {
            httpOnly: true,
            secure: false
        })
    }

    if (user.refreshToken) {
        res.cookie("refreshToken", user.refreshToken, {
            httpOnly: true,
            secure: false,
        })
    }
}
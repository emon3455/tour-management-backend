import { JwtPayload } from "jsonwebtoken";
import { envVariable } from "../config/env";
import { IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";

export const createUserTokens = (user: Partial<IUser>) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    }
    const accessToken = generateToken(jwtPayload, envVariable.JWT_ACCESS_SECRET, envVariable.JWT_ACCESS_EXPIRES)
    const refreshToken = generateToken(jwtPayload, envVariable.JWT_REFRESH_SECRET, envVariable.JWT_REFRESH_EXPIRES)

    return{
        accessToken,
        refreshToken
    }
    
}

export const createNewAccessTokenWithRefreshToken = async (refreshToken: string) => {

    const verifiedRefreshToken = verifyToken(refreshToken, envVariable.JWT_REFRESH_SECRET) as JwtPayload


    const isUserExist = await User.findOne({ email: verifiedRefreshToken.email })

    const jwtPayload = {
        userId: isUserExist!._id,
        email: isUserExist!.email,
        role: isUserExist!.role
    }
    const accessToken = generateToken(jwtPayload, envVariable.JWT_ACCESS_SECRET, envVariable.JWT_ACCESS_EXPIRES)

    return accessToken
}
import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"; 
import { generateToken } from "../../utils/jwt";
import { envVariable } from "../../config/env";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userToken";

const credentialsLogin = async (payload: any) => {
    const { email, password } = payload;

    const isUserExist: any = await User.findOne({ email }).lean();

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Not Found");
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist?.password)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid Password");
    } else {
        const userToken = createUserTokens(isUserExist)
        // const jwtPayload = {
        //     userId: isUserExist._id,
        //     email: isUserExist.email,
        //     role: isUserExist.role,
        // }
        // const authToken = generateToken(jwtPayload, envVariable.JWT_ACCESS_SECRET, envVariable.JWT_ACCESS_EXPIRES )
        // const refereshToken = generateToken(jwtPayload, envVariable.JWT_REFRESH_SECRET, envVariable.JWT_REFRESH_EXPIRES )

        const { password, ...rest } = isUserExist;
        return {...rest, ...userToken}
    }
}

const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }

}

export const AuthServices = {
    credentialsLogin,
    getNewAccessToken
}
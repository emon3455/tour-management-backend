import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs"
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../utils/userToken";
import { JwtPayload } from "jsonwebtoken";
import { envVariable } from "../../config/env";

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

const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId)

    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)
    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
    }

    user!.password = await bcryptjs.hash(newPassword, Number(envVariable.BCRYPT_SALT_ROUND))

    user!.save();

}

export const AuthServices = {
    credentialsLogin,
    getNewAccessToken,
    resetPassword
}
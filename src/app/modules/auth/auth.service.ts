import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs"

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
        const { password, ...rest } = isUserExist;
        return rest
    }
}

export const AuthServices = {
    credentialsLogin
}
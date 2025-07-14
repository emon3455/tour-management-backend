import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs"

const createUser = async (payload: Partial<IUser>)=>{

    const {email, password, ...rest} = payload;

    const isUserExist:any = await User.find({email});

    if(isUserExist?.email){
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
    }

    const hashedPassword = await bcryptjs.hash(password as string, 10)
    

    const authProvider : IAuthProvider = {provider:"credentials", providerId:email as string}

    const user = await User.create({email, auths:[authProvider], password: hashedPassword,...rest});

    return user;
}

const getAllUser = async () =>{
    const users = await User.find();
    return users;
}

export const UserServices = {
    createUser,
    getAllUser
}
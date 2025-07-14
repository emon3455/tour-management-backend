import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const generateToken = (payload: JwtPayload, secret: string, expiresIn: string)=>{
    const token = jwt.sign(payload, secret, {expiresIn}as SignOptions);
    return token;
}

export const verifyToken = (toekn: string, secret:string)=>{
    const isVerified = jwt.verify(toekn, secret);
    return isVerified;
}
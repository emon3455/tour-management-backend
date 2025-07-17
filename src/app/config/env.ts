import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
    PORT: string
    DB_URL: string
    NODE_ENV: "development" | "production"
    JWT_ACCESS_SECRET: string
    JWT_ACCESS_EXPIRES: string
    BCRYPT_SALT_ROUND: string
    SUPER_ADMIN_EMAIL: string
    SUPER_ADMIN_PASSWORD: string
    JWT_REFRESH_SECRET: string
    JWT_REFRESH_EXPIRES: string
    FRONTEND_URL: string
    EXPRESS_SESSION_SECRET: string
    GOOGLE_CALLBACK_URL: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
}

const loadEnvVariable = (): EnvConfig => {

    const requiredEnvVariable: string[] = ["PORT", "DB_URL", "NODE_ENV", "JWT_ACCESS_SECRET", "JWT_ACCESS_EXPIRES", "BCRYPT_SALT_ROUND", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASSWORD","JWT_REFRESH_SECRET","JWT_REFRESH_EXPIRES","FRONTEND_URL","EXPRESS_SESSION_SECRET","GOOGLE_CALLBACK_URL","GOOGLE_CLIENT_ID","GOOGLE_CLIENT_SECRET"]

    requiredEnvVariable.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing Required Environment Variable: ${key}`)
        }
    })

    
    return {
        DB_URL: process.env.DB_URL as string,
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    }
}

export const envVariable = loadEnvVariable();
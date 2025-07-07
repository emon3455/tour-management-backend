import dotenv from "dotenv";
dotenv.config();

interface EnvConfig {
    PORT: String
    DB_URL: String
    NODE_ENV: "development" | "production"
}

const loadEnvVariable = (): EnvConfig => {

    const requiredEnvVariable: string[] = ["PORT", "DB_URL", "NODE_ENV"]

    requiredEnvVariable.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing Required Environment Variable: ${key}`)
        }
    })

    return {
        DB_URL: process.env.DB_URL as string,
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
    }
}

export const envVariable = loadEnvVariable();
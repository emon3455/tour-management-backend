"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVariable = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loadEnvVariable = () => {
    const requiredEnvVariable = ["PORT", "DB_URL", "NODE_ENV"];
    requiredEnvVariable.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing Required Environment Variable: ${key}`);
        }
    });
    return {
        DB_URL: process.env.DB_URL,
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV,
    };
};
exports.envVariable = loadEnvVariable();

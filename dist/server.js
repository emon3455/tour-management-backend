"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
let server;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(env_1.envVariable.DB_URL);
        console.log("MongoDB Connected");
        server = app_1.default.listen(env_1.envVariable.PORT, () => {
            console.log(`Server is listening to port ${env_1.envVariable.PORT}`);
        });
    }
    catch (error) {
        console.log("Error:", error);
    }
});
startServer();
process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception Detected..!, Server shutting Down. ", error);
    if (server) {
        process.exit(1);
    }
    process.exit(1);
});
process.on("unhandledRejection", (error) => {
    console.log("Unhandle Rejection Detected..!, Server shutting Down. ", error);
    if (server) {
        process.exit(1);
    }
    process.exit(1);
});
process.on("SIGINT", (error) => {
    console.log("SIGINT Detected..!, Server shutting Down. ", error);
    if (server) {
        process.exit(1);
    }
    process.exit(1);
});
process.on("SIGTERM", (error) => {
    console.log("SIGTERM Detected..!, Server shutting Down. ", error);
    if (server) {
        process.exit(1);
    }
    process.exit(1);
});

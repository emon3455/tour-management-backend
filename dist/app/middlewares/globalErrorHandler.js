"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const globalErrorHandler = (error, req, res, next) => {
    const status = 500;
    const message = `Something Went Wrong! ${error === null || error === void 0 ? void 0 : error.message}`;
    res.status(status).json({
        success: false,
        message,
        error,
        stack: env_1.envVariable.NODE_ENV === "development" ? error.stack : null
    });
};
exports.globalErrorHandler = globalErrorHandler;

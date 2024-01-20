"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        error: {
            code: statusCode,
            message: error.message
        }
    });
};
exports.default = errorHandler;

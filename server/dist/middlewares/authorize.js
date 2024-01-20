"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const secret = config_1.config.jwt.secret;
const createToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '7d' });
};
exports.createToken = createToken;
const verifyToken = (token, secret) => {
    try {
        return {
            isValid: true,
            content: jsonwebtoken_1.default.verify(token, secret),
        };
    }
    catch (error) {
        return {
            isValid: false,
            content: {},
        };
    }
};
exports.verifyToken = verifyToken;
const authorize = (req, res, next) => {
    const token = req.headers.authorization;
    const parsedToken = token?.replace('Bearer ', '') || '';
    const result = (0, exports.verifyToken)(parsedToken, secret);
    if (!token || !result.isValid) {
        res.status(401);
        throw new Error('Unathorized access');
    }
    next();
};
exports.authorize = authorize;

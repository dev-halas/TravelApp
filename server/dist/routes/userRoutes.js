"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
exports.userRoutes = express_1.default.Router();
const index_1 = require("../controllers/index");
const authorize_1 = require("../middlewares/authorize");
exports.userRoutes.post('/register', index_1.RegisterUser);
exports.userRoutes.post('/login', index_1.LoginUser);
exports.userRoutes.post('/forgot-password', index_1.forgotPassword);
exports.userRoutes.put('/reset-password/:userId/:token', index_1.resetPassword);
exports.userRoutes.get('/panel', authorize_1.authorize, index_1.userPanel);

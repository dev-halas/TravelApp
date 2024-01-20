"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema_1 = __importDefault(require("../../schemas/UserSchema"));
exports.RegisterUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password, phone } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide all fields');
    }
    const userEmailExist = await UserSchema_1.default.findOne({ email });
    if (userEmailExist) {
        res.status(400);
        throw new Error('email already exist!');
    }
    const userPhoneExist = await UserSchema_1.default.findOne({ phone });
    if (userPhoneExist) {
        res.status(400);
        throw new Error('phone number already exist!');
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const hashPassword = await bcrypt_1.default.hash(password, salt);
    await UserSchema_1.default.create({
        email,
        phone,
        password: hashPassword
    });
    res.status(200).json({
        message: "Register succesfully"
    });
});

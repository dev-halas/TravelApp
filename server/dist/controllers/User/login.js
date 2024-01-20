"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema_1 = __importDefault(require("../../schemas/UserSchema"));
const authorize_1 = require("../../middlewares/authorize");
const findUserByEmailOrPhone = async (userLogin) => {
    return await UserSchema_1.default.findOne({
        $or: [{ email: userLogin }, { phone: userLogin }],
    });
};
exports.LoginUser = (0, express_async_handler_1.default)(async (req, res) => {
    const { userLogin, password } = req.body;
    const user = await findUserByEmailOrPhone(userLogin);
    if (!user) {
        res.status(401);
        throw new Error('Invalid user credential');
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        res.status(400);
        throw new Error('Incorrect password');
    }
    res.json({
        token: (0, authorize_1.createToken)({ id: user._id, user: user.email || user.phone }),
    });
});

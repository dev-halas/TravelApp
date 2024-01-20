"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema_1 = __importDefault(require("../../schemas/UserSchema"));
exports.resetPassword = (0, express_async_handler_1.default)(async (req, res) => {
    const { userId, token } = req.params;
    const { newPassword } = req.body;
    const user = await UserSchema_1.default.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    if (!user.resetPasswordToken || !user.resetPasswordExpires || user.resetPasswordToken !== token || Date.now() > user.resetPasswordExpires.getTime()) {
        res.status(400);
        throw new Error('Invalid or expired password reset token');
    }
    if (!newPassword) {
        res.status(400);
        throw new Error('Password required');
    }
    const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.status(200).json({
        message: 'Password has been reset',
    });
});

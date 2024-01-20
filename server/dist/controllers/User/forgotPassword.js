"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const UserSchema_1 = __importDefault(require("../../schemas/UserSchema"));
const crypto_1 = __importDefault(require("crypto"));
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const generatePasswordResetLink = async (userId) => {
    const token = crypto_1.default.randomBytes(20).toString('hex');
    const url = `http://localhost:5000/reset-password/${userId}/${token}`;
    try {
        await UserSchema_1.default.findByIdAndUpdate(userId, { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 });
    }
    catch (error) {
        console.error(`Error occurred while updating user with id: ${userId}. Error: ${error}`);
        throw error;
    }
    return url;
};
exports.forgotPassword = (0, express_async_handler_1.default)(async (req, res) => {
    const { email } = req.body;
    const user = await UserSchema_1.default.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    const resetLink = await generatePasswordResetLink(user._id);
    const subject = 'Password Reset Requested';
    const text = `To reset your password, click the following link: ${resetLink}`;
    await (0, sendEmail_1.default)(user.email, subject, text);
    res.status(200).json({
        message: 'A reset code has been sent to your email',
    });
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config/config");
const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer_1.default.createTransport({
        host: config_1.config.email.host,
        port: 465,
        secure: true,
        auth: {
            user: config_1.config.email.user,
            pass: config_1.config.email.pass,
        },
    });
    const mailOptions = {
        from: config_1.config.email.from,
        to: to,
        subject: subject,
        text: text,
    };
    await transporter.sendMail(mailOptions);
};
exports.default = sendEmail;

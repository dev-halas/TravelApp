"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPanel = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.userPanel = (0, express_async_handler_1.default)(async (req, res) => {
    res.json({ mess: 'This is a user panel root(protected)' });
});

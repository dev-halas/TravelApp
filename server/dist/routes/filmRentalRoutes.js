"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filmRentalRoutes = void 0;
const express_1 = __importDefault(require("express"));
exports.filmRentalRoutes = express_1.default.Router();
const index_1 = require("../controllers/index");
const authorize_1 = require("../middlewares/authorize");
exports.filmRentalRoutes.get('/GetAll', authorize_1.authorize, index_1.GetAll);
exports.filmRentalRoutes.get('/GetById/:id', authorize_1.authorize, index_1.GetById);
exports.filmRentalRoutes.post('/Add', index_1.Add);
exports.filmRentalRoutes.put('/Edit/:id', index_1.Edit);
exports.filmRentalRoutes.delete('/Delete/:id', index_1.Delete);

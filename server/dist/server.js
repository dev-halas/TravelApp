"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const dbConnect_1 = require("./config/dbConnect");
const userRoutes_1 = require("./routes/userRoutes");
const filmRentalRoutes_1 = require("./routes/filmRentalRoutes");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
// CONNECT DB FUNCTION
(0, dbConnect_1.connectDB)();
const app = (0, express_1.default)();
const port = config_1.config.server.port;
app.use((0, cors_1.default)({ credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log(`Server listen on port: ${port}`);
});
app.use('/api/user', userRoutes_1.userRoutes);
app.use('/api/filmRental', filmRentalRoutes_1.filmRentalRoutes);
app.use(errorHandler_1.default);

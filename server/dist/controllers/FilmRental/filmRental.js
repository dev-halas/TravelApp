"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Edit = exports.Add = exports.GetById = exports.GetAll = void 0;
const FilmRentalSchema_1 = __importDefault(require("../../schemas/FilmRentalSchema"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.GetAll = (0, express_async_handler_1.default)(async (req, res) => {
    const filmRentals = await FilmRentalSchema_1.default.find();
    res.json(filmRentals);
});
exports.GetById = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const filmRental = await FilmRentalSchema_1.default.findById(id);
    res.json(filmRental);
});
exports.Add = (0, express_async_handler_1.default)(async (req, res) => {
    const { firstName, lastName, filmName, rentDate, createdAt } = req.body;
    await FilmRentalSchema_1.default.create({
        firstName,
        lastName,
        filmName,
        rentDate,
        createdAt
    });
});
exports.Edit = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, filmName, rentDate, createdAt } = req.body;
    const updatedFilmRental = await FilmRentalSchema_1.default.findByIdAndUpdate(id, { firstName, lastName, filmName, rentDate, createdAt });
    res.json(updatedFilmRental);
});
exports.Delete = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const filmRental = await FilmRentalSchema_1.default.findByIdAndRemove(id);
    res.json({ message: 'Rental deleted' });
});

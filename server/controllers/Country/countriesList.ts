import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import CountryModel from '../../schemas/CountrySchema';

export const getCountriesList = asyncHandler(async (req: Request, res: Response) => {
    const countries = await CountryModel.find().select('_id name');
    res.status(200).json(countries);
});
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import CountryModel from '../../schemas/CountrySchema';

export const getCountryDetailsById = asyncHandler(async (req: Request, res: Response) => {
    const countryId = req.params.id;
    const country = await CountryModel.findOne({ id: countryId });

    if (!country) {
        res.status(404).json({ message: 'Country not found' });
        return;
    }

    res.status(200).json(country);
});

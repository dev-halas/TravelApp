import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Travel from '../../schemas/TravelSchema';

// Dodawanie nowej podróży
export const addTravel = asyncHandler(async (req: Request, res: Response) => {
    const { userId, countryId } = req.body;

    // Tworzenie nowej podróży
    const newTravel = new Travel({
        userId,
        country: countryId,
        thingsToPack: [] 
    });

    // Zapis podróży w bazie danych
    const savedTravel = await newTravel.save();

    res.status(201).json(savedTravel);
});

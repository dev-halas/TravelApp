import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Travel from '../../schemas/TravelSchema';

// Dodawanie rzeczy do spakowania do podróży
export const addThingsToPack = asyncHandler(async (req: Request, res: Response) => {
    const travelId  = req.params.travel_id;
    const { thingsToPack } = req.body;

    // Znajdowanie podróży po ID i aktualizacja listy rzeczy do spakowania
    const updatedTravel = await Travel.findByIdAndUpdate(
        travelId,
        { $push: { thingsToPack: { $each: thingsToPack } } },
        { new: true }
    );

    if (!updatedTravel) {
        res.status(404).json({ message: 'Travel not found' });
        return;
    }

    res.status(200).json(updatedTravel);
});
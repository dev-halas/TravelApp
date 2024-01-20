import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Travel from '../../schemas/TravelSchema';

// Pobieranie listy rzeczy do spakowania dla podróży
export const getThingsToPack = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
        const travelId = req.params.travel_id; // Pobieranie ID podróży z parametrów URL

        if (!mongoose.Types.ObjectId.isValid(travelId)) {
            res.status(400).json({ message: 'Invalid travel ID' });
            return;
        }

        const travel = await Travel.findById(travelId);

        if (!travel) {
            res.status(404).json({ message: 'Travel not found' });
            return;
        }

        res.status(200).json({ thingsToPack: travel.thingsToPack });
    }
);

import express from 'express'
export const travelRoutes = express.Router()

import { 
    addTravel,
    addThingsToPack,
    getThingsToPack
} from '../controllers/index';

import { authorize } from '../middlewares/authorize';

travelRoutes.post('/add', authorize, addTravel)
travelRoutes.post('/add-things-to-pack/:travel_id', authorize, addThingsToPack)
travelRoutes.get('/add-things-to-pack/:travel_id', authorize, getThingsToPack)
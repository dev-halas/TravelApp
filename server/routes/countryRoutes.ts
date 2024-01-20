import express from 'express'
export const countryRoutes = express.Router()

import { 
    getCountriesList,
    getCountryDetailsById
} from '../controllers/index';

import { authorize } from '../middlewares/authorize';

countryRoutes.get('/list', authorize, getCountriesList)
countryRoutes.get('/country-details/:_id', authorize, getCountryDetailsById)
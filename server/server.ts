import express from 'express'
import cors from 'cors'
import { config } from './config/config'
import { connectDB } from './config/dbConnect'
import { userRoutes } from './routes/userRoutes'
import { countryRoutes } from './routes/countryRoutes'
import { travelRoutes } from './routes/travelRoutes'
import errorHandler from './middlewares/errorHandler'

// CONNECT DB FUNCTION
connectDB()

const app = express()
const port = config.server.port
const apiVersion = 'v1';

app.use(cors({ credentials: true }))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.listen(port, () => {
    console.log(`Server listen on port: ${port}`)
})

app.use(`/api/${apiVersion}/user`, userRoutes)
app.use(`/api/${apiVersion}/countries`, countryRoutes)
app.use(`/api/${apiVersion}/travel`, travelRoutes)
app.use(errorHandler)







import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())



app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))
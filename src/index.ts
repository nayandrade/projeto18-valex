import cors from 'cors'
import express, {json} from 'express'
import dotenv from 'dotenv'
import router from './routes/router'

dotenv.config()

const app = express()

app.use(cors(), json())

app.use(router);


app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))
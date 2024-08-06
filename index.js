import express from 'express'
import {config} from 'dotenv'
import configDb from './api/config/configDb.js'
import fileRouter from './api/routers/fileRouter.js'

import path from 'path'
import cors from 'cors'
config()
configDb()

const __dirname = path.resolve();
const app = express()
app.options('*',cors())


app.use(express.static(path.join(__dirname, '/client/dist')));
app.use('/api',fileRouter)
app.listen(process.env.PORT,()=>{
    console.log(`server running on port : ${process.env.PORT}`)
})
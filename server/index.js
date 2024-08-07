import express from 'express'
import {config} from 'dotenv'
import configDb from './api/config/configDb.js'
import fileRouter from './api/routers/fileRouter.js'
import path from 'path'
import cors from 'cors'

config()
configDb()


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api',fileRouter)
// app.use('/',async(req,res)=>{
//   res.json({message:'api working!'})
// })
app.use(express.static(path.join(__dirname,'..', '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'..', 'client', 'dist', 'index.html'));
})

app.listen(process.env.PORT,()=>{
    console.log(`server running on port : ${process.env.PORT}`)
})

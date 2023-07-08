import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import AuthRoute from './Routes/AuthRoute'
import UserRoute from './Routes/UserRoute'
import PostRoute from './Routes/PostRoute'
import UploadRoute from './Routes/UploadRoute'
import ChatRoute from './Routes/ChatRoute'
import MessageRoute from './Routes/MessageRoute'
const app = express()


//middleware 
app.use(express.json())
app.use(cors())
app.use(express.static('src/public')); 
app.use('/images', express.static('images'));


app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/upload', UploadRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)
dotenv.config();


mongoose.connect(process.env.MONGODB_CONNECTION)

export const viteNodeApp = app;
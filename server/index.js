import express from "express"
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.router.js'
import gigRouter from './routes/gig.router.js'
import reviewRouter from './routes/review.router.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';


const app = express();

dotenv.config();


mongoose.set('strictQuery',true);

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
    // console.log(process.env.MONGO);
}

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDb Disconnected");
})

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({origin:"http://localhost:5173",credentials:true}));

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/gigs',gigRouter);
app.use('/api/reviews',reviewRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
  
    return res.status(errorStatus).send(errorMessage);
  });
    
app.listen(8800,()=>{
    connect();
    console.log("Backend server is running");
})
import { configDotenv } from "dotenv";

import express from "express"
import connectDb from "./db.js";

import authRoutes from "./routes/authRoutes.js"

configDotenv();

const app=express();

connectDb();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API running');
})

app.use('/api/auth',authRoutes);


const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})

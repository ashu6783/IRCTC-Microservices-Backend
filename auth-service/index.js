import { configDotenv } from "dotenv";

import express from "express"
import connectDb from "./db.js";
import { protect } from "./middleware/protect.js";
import { isAdmin } from "./middleware/adminCheck.js";

import authRoutes from "./routes/authRoutes.js"

configDotenv();

const app=express();

connectDb();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API running');
})

app.use('/api/auth',authRoutes);

app.get('api/profile',protect,(req,res)=>{
    res.json({message:`Welcome ${res.user.name}!.This is your profile.`})
})
app.get('api/admin/dashboard',isAdmin,(req,res)=>{
    res.json({message:`Welcome Admin ${res.user.name}!`})
})


const PORT= process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
})

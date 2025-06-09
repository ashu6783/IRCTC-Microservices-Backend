import mongoose from "mongoose";

const connectDb= async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI,{
        });
        console.log(`mongodb connected:${conn.connection.host}`);
    } catch (error) {
        console.error(`error connecting db`);
        process.exit(1);
    }
}

export default connectDb
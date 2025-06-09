import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const generateToken = (userId,role)=>{
    return jwt.sign({id:userId,role},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}

export default generateToken;
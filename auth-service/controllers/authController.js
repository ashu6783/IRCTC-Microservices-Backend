import User from "../modals/user.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";


export const registerUser = async(req,res)=>{
    const {name,username,email,password} = req.body;
    try {
        const userExists= await User.findOne({email})
        if(userExists) return res.status(400).json({message:'User already exists!'});

        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({name,username,email,password:hashedPassword});

        res.status(201).json({
            _id:user._id,
            name:user.name,
            username:user.username,
            email:user.email,
            token:generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:'Invalid Credentials'});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:'Invalid credentials'});

        res.status(201).json({
            _id:user._id,
            name:user.name,
            username:user.username,
            email:user.email,
            token:generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}







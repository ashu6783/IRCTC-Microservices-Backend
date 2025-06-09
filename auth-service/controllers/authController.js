import User from "../modals/user.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import user from "../modals/user.js";


export const registerUser = async(req,res)=>{
    const {name,username,email,role,password,adminKey} = req.body;
    try {
        const userExists= await User.findOne({email})
        if(userExists) return res.status(400).json({message:'User already exists!'});

        if(role==='admin'){
            if(adminKey!==process.env.ADMIN_CREATION_KEY){
               return res.status(402).json({message:'Invalid admin key provided'})
            } 
        }

        const hashedPassword=await bcrypt.hash(password,10);
        const newUser = await User.create({
            name,
            username,
            email,
            role: role || "user",
            password: hashedPassword
        });

        res.status(201).json({
            _id:newUser._id,
            name:newUser.name,
            username:newUser.username,
            email:newUser.email,
            role:newUser.role,
            token:generateToken(newUser._id,newUser.role)
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

        const isRole= user.role==="admin"
        if(!isRole) return res.status(403).json({message:"Access denied"});

        res.status(201).json({
            _id:user._id,
            name:user.name,
            username:user.username,
            email:user.email,
            role:user.role,
            token:generateToken(user._id,user.role)
        })
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getUser = async(req,res)=>{
    try {
        const users= await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}







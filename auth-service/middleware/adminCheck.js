export const isAdmin = (req,res,next) =>{
    if(req.user && req.user.role === "admin"){
        next();
    }
    return res.status(402).jspn({message:"Acess denied! Admins access only!"})
}
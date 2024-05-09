import asyncHandler from "./asyncHandler.js";
import  jwt  from "jsonwebtoken";
import User from "../models/userModel.js";



// Protect  Middleware

const protect = asyncHandler(async(req,res,next) => {
    let token;

    // Read the Jwt from token

    token = req.cookies.jwt; // the cookie is set and called as jwt in userController.js which is being used here.
    // Here our goal to use asynchandler and calling jwt is to use/parse the cookie that is saved in the 
    // http read only 

    if(token){
        try {
            // we decode the token to get the user id because when we created the token 
            // we paased the user id as payload

            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            // password is already hashed so subtracting password as it is of no use
            // we added the USER to the user object as req.user

            next(); // to move to the next piece of middleware

            
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
            
        }

    }
    else{
        res.status(401);
        throw new Error("Not authorized, no token");
    }
})


// Admin MiddleWare

const admin  = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401);
        throw new Error("Not authorized, not a admin");

    }
}

export {protect, admin};
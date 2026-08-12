import asyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"

export const protect = asyncHandler(async (req,res,next)=>{
    let token;
    let authheader = req.headers.authorization;

    if(authheader && authheader.startsWith("Bearer")){
        token = authheader.split(" ")[1]
        if(!token){
            resizeBy.status(401);
            throw new Error("user not authorised or token is missing");
        }

        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        console.log("Decoded Token:" ,decoded);

        req.user = decoded;

        next();        
    }else{
        res.status(401);
        throw new Error("User is not authorized or token is missing");
        
    }
})


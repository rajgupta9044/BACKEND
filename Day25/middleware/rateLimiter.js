
const redisClient=require("../config/redis");


const rateLimiter= async (req,res,next)=>{
    
    try{
        const ip=req.ip; 

        const count=await redisClient.incr(ip);

        if(count==1)
            await redisClient.expire(3600);

        if(count>10){
            throw new Error("USer Limit exceeded");
        }

        next();
    }

    catch(err){
        res.send("error"+err.message);
    }
}

module.exports=rateLimiter;


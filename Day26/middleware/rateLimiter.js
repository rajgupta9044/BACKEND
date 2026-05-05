
const redisClient=require("../config/redis");

//total time
const windowsize=3600;

const maxrequest=60;

const rateLimiter= async (req,res,next)=>{
   
    try{
        const key=`IP:${req.ip}`;
        const current_time=Date.now()/1000;
        const window_time=current_time-windowsize; 

        //1:20 hr -1hour=12:20

        //12:20 se pehle walo ko remove kar do 
        await redisClient.zRemRangeByScore(key,0,window_time);

        //total no of val/req kitni hai
        const numberofRequest= await redisClient.zCard(key);

        if(numberofRequest>maxrequest){
            throw new Error("No of Request Exceeded");
        }

        //if no of req is in range then add

        await redisClient.zAdd(key,[{score:current_time,value:`${current_time} :${Math.random()}`}]);

        //Key TTL hai to usko increase krna

        await redisClient.expire(key,windowsize);  

        next();

    }

    catch(err){
        res.send("error"+err.message);
    }
}

module.exports=rateLimiter;


// USING FIXED WINDOW
 
    // try{
    //     const ip=req.ip; 

    //     const count=await redisClient.incr(ip);

    //     if(count==1)
    //         await redisClient.expire(3600);

    //     if(count>10){
    //         throw new Error("USer Limit exceeded");
    //     }

    //     next();
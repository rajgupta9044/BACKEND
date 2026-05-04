const express=require('express');
const commentRouter=express.Router();


commentRouter.get("/",(req,res)=>{
    res.send("Comment send");
})

commentRouter.patch("/",(req,res)=>{
    res.send("Comment update");
})

commentRouter.delete("/",(req,res)=>{
    res.send("Comment delete");
})


module.exports=commentRouter;
const express=require("express");
const app=express();


const bookStore=[
    {id:1,name:"Oliver Twist",author:"Robin" },
    {id:2,name:"Y",author:"Robin" },
    {id:3,name:"Z",author:"Rohit" },
]

app.get("/book",(req,res)=>{

    res.send(bookStore);

})

app.listen(5000,()=>{
    console.log("Listening at port 5000");
})
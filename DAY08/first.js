const express =require("express")
const app=express();



//ROUTE HANDLER
// app.use(route,RH,RH,RH,RH)

//CAN ONLY SEND ONE RESPONSE AT THE SAME TIME


//MIDDLEWARE MW MW MW REQ/RES HANDLER
app.use("/user",[(req,res,next)=>{
    // res.send("HELLO JI");
    next();
},
 
(req,res,next)=>{
    // res.send("HELLO I AM SECOND");
    console.log("Hello i am second");
    next();
}
,
(req,res)=>{
    console.log("Hello i am third")
    res.send("HELLO I AM THIRD");
}
]
);

app.listen(4000,()=>{
    console.log("Listening at port 4000")
})
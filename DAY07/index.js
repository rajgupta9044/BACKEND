const express=require("express");
const app=express();


// app.use("/user",(req,res)=>{
//     res.send({name:"RAJ"});
// })

//    TO RECEIVE DATA FROM THE BODY OF POST WE HAVE TO DO 
//     PARSING OF THE DATA 

app.use(express.json());

//middleware:json format data =>js object



app.get("/user",(req,res)=>{
    res.send({name:"RAJ"});
})

app.post('/user',(req,res)=>{

    console.log(typeof req.body.age);
    res.send("DATA SAVED");
})



app.listen(4000,()=>{
    console.log("Listening at port 4000)");
})


const express =require("express");


//Creating an instance of app
const app=express();


    
        //Routing     //Callback function 
app.use("/about/:id",(req,res)=>{
    res.send("I am your About pagee");
});

//Using params for dynamic parameter to avoid hardcode
// /:id

app.use("/contact/:id",(req,res)=>{
    console.log(req.params);
    res.send("I am your contact pagee");
});

app.use("/",(req,res)=>{
    res.send({"name":"raj" ,"age":"20","sex":"Male"})
});

app.listen(4000,()=>{
    console.log("Listening at port 4000");
});
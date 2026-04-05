const express=require("express");
const app=express();
const main=require("./database");
const User=require("./Models/users");

app.use(express.json());

app.post("/register",async(req,res)=>{

    try{
        await User.insertOne(req.body);
        res.send("user Registered Successfully");
    }
    catch(err){
        res.send("Error"+ err.message);
    }
})

app.get("/register",async(req,res)=>{

    try{
        const info=await User.find({});
        res.send(info);
    }
    catch(err){
        res.send("Error"+ err.message);
    }
})


app.get("/user/:id",async(req,res)=>{

     try{
        const result=await User.findById(req.params.id);
        res.send(result);
    }

    catch(err){
        res.send("Error"+ err.message);
    }

})

app.delete("/user/:id",async (req,res)=>{
    try{
         await User.findByIdAndDelete(req.params.id);
         res.send("Deleted Succesfully");
    }

     catch(err){
        res.send("Error"+ err.message);
    }
})

app.patch("/user",async (req,res)=>{
    try{
    //it will destructure the req.body   
    // "_id":"69d241f6b9061d2875be7544",
    // "firstName":"DJ",
    // "lastName":"bravo"


        const {_id,...update} =req.body;
         await User.findByIdAndUpdate(_id,update,{"runValidators":true});
         res.send("update successfully");
    }

     catch(err){
        res.send("Error"+ err.message);
    }
})






main()
    .then(async()=>{
    console.log("Connected to DB")

    app.listen(3000,()=>{
    console.log("Listening at port 3000");
})

})

.catch((err)=>console.log(err));



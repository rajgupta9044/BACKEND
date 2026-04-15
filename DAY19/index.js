const express=require("express");
const app=express();
const main=require("./database");
const User=require("./Models/users");
const validateUser=require("./utils/validate");
const bcrypt=require("bcrypt");

app.use(express.json());

app.post("/register",async(req,res)=>{

    ///API LEVEL VALIDATION

    try{

        //once the user data is validated completely
    validateUser(req.body); 
    
    //converting password to hashcode
    req.body.password=await bcrypt.hash(req.body.password,10);

     
     


    await User.create(req.body);
    res.send("User Registered Successfully");


    await User.insertOne(req.body);
    res.send("user Registered Successfully");
    }

    
    catch(err){
        res.send("Error"+ err.message);
    }


})


app.post("/login", async (req,res) => {

    try {

        const people = await User.findById(req.body._id);

        if (!people)
            throw new Error("User not found");

        if (req.body.email !== people.email)
            throw new Error("Invalid Credential");

        const isAllowed = await bcrypt.compare(req.body.password, people.password);

        if (!isAllowed)
            throw new Error("Invalid Credentials");

        res.send("Login successfully");

    }
    catch (err) {
        res.send("error " + err.message);
    }
});


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



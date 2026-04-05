const express=require("express");
const app=express();
const main=require("./database");
const User=require("./Models/users")

app.use(express.json());

app.get("/info",async(req,res)=>{

  const ans =await User.find({});
  res.send(ans);
})


app.post("/info",async(req,res)=>{
    
    // const ans=new User(req.body);
    // await ans.save();
     
    try{
        await User.create(req.body);
        res.send("Successfully update");
    }
    catch(err){
         res.status(500).send(err);
    }
   
})

app.delete("/info",async(req,res)=>{

    await User.deleteOne({name:"Vishal"});
    res.send("deleted");
})

app.put("/info",async(req,res)=>{

    const result=await User.updateOne({name:"Rishi"},{age:10});
    res.send("Updated");
})


main()
    .then(async()=>{
    console.log("Connected to DB")
    app.listen(3000,()=>{
    console.log("Listening at port 3000");
})

// const result = await User.find({name:"Rishi"});
//     console.log(result);

})

.catch((err)=>console.log(err));



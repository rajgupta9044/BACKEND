const express=require("express");
const app=express();


const bookStore=[
    {id:1,name:"Oliver Twist",author:"Robin" },
    {id:2,name:"Y",author:"Robin" },
    {id:3,name:"M",author:"Rohit" },
    {id:4,name:"N",author:"Vikas" },
    {id:5,name:"O",author:"Six" },
]


app.use(express.json());

//app.use  accepts all the methods(get,post,put,delete)
//But the problem is it only match with the first string if matched then dont find further 

//even if we write /book/id it will still return /book


//BUT GET ,POST ,PUT ,DELETE DONT BEHAVE LIKE THAT 

app.get("/book",(req,res)=>{

    res.send(bookStore);

})

app.get("/book/:id",(req,res)=>{
   
   // req.params :: give us response in form of Object
   
    const id=parseInt(req.params.id)
    const book= bookStore.find(info=>info.id==id);
    res.send(book);
    
})

app.post('/book',(req,res)=>{
    
    bookStore.push(req.body);
    res.send("Data saved Succesfull")
    
})



app.listen(5000,()=>{
    console.log("Listening at port 5000");
})
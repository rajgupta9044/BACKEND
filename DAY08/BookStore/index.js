const express=require("express");
const app=express();


const bookStore=[
    {id:1,name:"Oliver Twist",author:"Robin" },
    {id:2,name:"Y",author:"Robin" },
    {id:3,name:"M",author:"Rohit" },
    {id:4,name:"N",author:"Vikas" },
    {id:5,name:"O",author:"Six" },
]

//TO PARSE JSON DATA FROM THE REQUEST TO JS OBJECT 
app.use(express.json());

app.get("/book",(req,res)=>{

    res.send(bookStore);

})

app.get("/book/:id",(req,res)=>{
   
    const id=parseInt(req.params.id)
    const book= bookStore.find(info=>info.id==id);
    res.send(book);
    
})

app.post('/book',(req,res)=>{
    
    bookStore.push(req.body);
    res.send("Data saved Succesfull")
    
})


app.patch("/book",(req,res)=>{
    
    //KEVAL EK KO UPDATE KAREGA 

    const book=bookStore.find(info=>info.id===Number(req.body.id));

    if(req.body.name)
    book.name=req.body.name;

    if(req.body.author)
    book.author=req.body.author;

    res.send("Patch Updated");
})


//JAB PURA UPDATE KARNA HO

app.put("/book",(req,res)=>{

    const book=bookStore.find(info=>info.id===Number(req.body.id));
    book.name=req.body.name;
    book.author=req.body.author;
    res.send("PUT Updated");
})


app.delete("/book/:id",(req,res)=>{

    const id =parseInt(req.params.id);
    
    const index =bookStore.findIndex(info=>info.id===id);

    bookStore.splice(index,1);
    res.send("Successfully deleted");
})

app.listen(5000,()=>{
    console.log("Listening at port 5000");
})
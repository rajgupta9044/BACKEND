//CREATING A SERVER 


const http =require('http');

const server =http.createServer((req,res)=>{


    //display the message at port number 4000
    // res.end("Helllo Everyone ")


    if(req.url==='/contact'){
        res.end("this is the contact page");
    }

    else if (req.url==="/about"){
        res.end("this is the about page");
    }

    else{
        res.end("page not found");
    }


    
});

server.listen(4000,()=>{
    console.log("I am listening at port number 4000")
})
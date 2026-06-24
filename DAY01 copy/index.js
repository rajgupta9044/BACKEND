const express =require('express')
const app=express();
const {Server}=require("socket.io");

const http=require('http');

//CREATE HTTP SERVER OF APPLICATION
const server=http.createServer(app);

//SOCKET IO CONNECT WITH THE SERVER
const io=new Server(server);


//LISTEN SERVER AT PORT NUMBER 3000
server.listen(3000,()=>{
    console.log("Server running at port no 3000");
})

//Listen

//io -> jab sabko handle kar rhe
//socket -> 
// individual 
io.on("connection",(socket)=>{
    
    // key-value
    socket.on('message',(data)=>{
        io.emit('new-message',data)
    })
 
    //terminate or disconnect
    socket.on("disconnect",()=>{
        console.log("Disconnect form Server");
    })

})


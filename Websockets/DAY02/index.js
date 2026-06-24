const express =require('express')
const app=express();
const {Server}=require("socket.io");
const path=require('path')
const http=require('http');



const server=http.createServer(app);
const io=new Server(server);

app.get('/',(req,res)=>{
    
    res.sendFile(path.join(__dirname,'index.html'))
});


//LISTEN SERVER AT PORT NUMBER 3000
server.listen(3000,()=>{
    console.log("Server running at port no 3000");
})


io.on("connection",(socket)=>{ 
    
      
        socket.on('message',({room,msg})=>{
 
        socket.to(room).emit('new-message',msg);
   
      })



         // TO CREATE A ROOM
        socket.on('join-room',(room)=>{
            socket.join(room);
        })


 
    socket.on("disconnect",()=>{
        console.log("Disconnect from Server");
    })

})



    //   TO SEND MESSAGE TO ALLL THE PEOPLE WITHOUT ANY ROOM

    //     //server listen message and send to all the devices
    //     socket.on('message',(data)=>{

    //     //AGAR YE MESSAGE SBKE PASS BHEJNA HAI INCLUDING  YOUSELF
    //     // io.emit('new-message',data)

    //     //MESSAGE WILLL BE SEND TO ALL EXCEPT THE ONE WHO SEND IT
    //     socket.broadcast.emit('new-message',data);
   
    //   })


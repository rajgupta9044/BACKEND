const express =require('express');
const app =express();
const main=require('./aichat');

app.use(express.json());

//WE WILL STORE OUR USER CHAT HISTORY HERE
//key:value pair
//key=id
//value=array


const chattingHistory={

  //ARRAY :[USER HISTORY,MODEL HISTORY ,USER HISTORY ,MODEL HISTORY]
  // 1:[{role:'user',parts:[{text:"hi how are you"}]}, {role:'model',parts:[{text:["I am good what you doing"]}]}],
  // 2:[],
  // 3:[],
};

app.listen(3000,()=>{
  console.log("listening at port 3000");
})


app.post('/chat',async (req,res)=>{

  const {id,msg}=req.body;

  if(!chattingHistory[id]){
    chattingHistory[id]=[];
  }

  const History=chattingHistory[id];

  //HISTORY +CURRENT QUESTION OF THE USER
  const promptmessage=[...History,{

    role:'user',
    parts:[{text:msg}]

  }]

  const ans=await main(promptmessage);

  //user ke question ko insert karege
  //model ke response ko bhi insert krege

  History.push({role:'user',parts:[{text:msg}]});
  History.push({role:'model',parts:[{text:ans}]});

  res.send(ans);

})
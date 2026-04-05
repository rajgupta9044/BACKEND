const mongoose = require('mongoose');


async function main(){
    await mongoose.connect("mongodb+srv://rajgupta9044:kohliisgoat%4012@codeking.y0jmsn2.mongodb.net/Bookstore");

    //CREATE SCHEMA 
    // const userSchema =new Schema({
    //     name:String,
    //     age:Number,
    //     city:String,
    // })

    // MODEL KO CREATE =CREATE COLLECTION(TABLE KO CREATE KRNA)
    // CLASS CREATE KRNA

    // const User = mongoose.model('user', userSchema);

    // //creating object or document
    // const user1= new User({name:"Raj",age:23,city:"Delhi"});
    // await user1.save();


    // //for creating and saving in single statement
    // await User.create({name:"Rishi",age:20,city:"lucknow"});

    // //for multiple entries

    // await User.insertMany([{name:"rishav",age:20},{name:"piyush",gender:"M"}]);


    

    
}


// main()
//     .then(()=>console.log("Connected to DB"))
//     .catch((err)=>console.log(err));

module.exports=main;
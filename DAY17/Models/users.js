const mongoose = require('mongoose');
const { Schema } = mongoose;

 const userSchema =new Schema({
       firstName:{
        type:String,
        required:true,
        minLength:3,
        MaxLength:20,
       },

       lastName:{
        type:String
       },

       age:{
        type:Number,
        min:14,
        max:50
       },

       gender:{
        type:String,
        enum:["male","female","Trans"]

      //   validate(value){
      //       if(!["male","female","other"].includes(value))
      //             throw new Error("invalid Gender");
      //   }
       },

       email:{
        type:String,
         required:true,
         unique:true,
         trim:true,   //dont take any whitespaces
         lowercase:true,
         immutable:true   //change ni hoga
       },

       password:{
        type:String
       },

       photo:{
        type:String,
        default:"this is the default photo",  //store default is photo is not inserted 
       }
    },{timestamps:true})
                          //collection name //schema name
     const User = mongoose.model('user', userSchema);

     module.exports=User;
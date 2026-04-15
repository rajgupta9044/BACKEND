const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastName:{
        type:String
    },
    age:{
        type: Number,
        min: 14,
        max: 70,
        required: true,
    },
    gender:{
        type: String,
        // enum: ["male","female","others"]
        validate(value){
            if(!["male","female","others"].includes(value))
                throw new Error("Invalid Gender")
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
        immutable: true,
    },
    password:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        default: "This is the default photo"
    }
}, { timestamps: true })


//theese are the methods of the object people
userSchema.methods.getJWT=function(){
    
   const ans= jwt.sign({_id:this._id, email:this.email},process.env.SECRET_KEY);
   return ans;

}

userSchema.methods.verifyPassword = async function(Userpass){
    const ans = await bcrypt.compare(Userpass, this.password);
    return ans;
}



const User = mongoose.model("user",userSchema);

module.exports = User;
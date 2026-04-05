const bcrypt =require("bcrypt");

const password="Rohit@123";

//pass + salt ==>hashcode
 
async function Hashing(){
    
//generate new salt each time with password
 

//no of rounds 
//AUTOMATICALLY ADD THE SALT
// const hashpass= await bcrypt.hash(password,10);


//2ND METHOD WHEH YOU MANULLY ADD SALT 
const salt=await bcrypt.genSalt(10);
const hashpass=await bcrypt.hash(password,salt);


//now to compare pass with password storeed in database

const ans =await bcrypt.compare(password,hashpass);

console.log(ans);


console.log(hashpass);
console.log(salt);
}

Hashing();
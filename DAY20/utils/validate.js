const validator=require("validator");

   function validateUser(data){

    const mandatoryField =["firstName","email","age","password"];

    const IsAllowed=mandatoryField.every((k)=>Object.keys(data).includes(k));

    if(!IsAllowed)
        throw new Error("Fields Missing");

    if(!validator.isEmail(data.email))
        throw new Error("Invalid email");

    if(!validator.isStrongPassword(data.password))
        throw new Error("Weak pass");

    if(!(data.firstName.length>=3 && data.firstName.length<=20))
        throw new Error("first name must be greater than 3 and less than 20 ");


    //Password Validation
    //firstname->3  max-<20
   };

   module.exports=validateUser;
   
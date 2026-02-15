const auth=(req,res,next)=>{
    //ADD ITEMS TO THE FOODMENU
    //AUTHENTICATE THE ADMIN ,KI YE ADMIN HAI
    //DUMMY CODE FOR AUTHENTICATE

    const token="ABCDEF";
    const access=token==="ABCDEF";

    //AGAR NO ACCCESS THEN NO ACCESSS STATUS

if(!access){
    res.status(403).send("No Acccess");
    }

    next();
}

module.exports={auth};
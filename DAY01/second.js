console.log("HEllo everyone");

function sum(a,b){
    console.log(a+b);
}


function sub(a,b){
    console.log(a-b);
}
//we cannot call this function in first.js directly

module.exports={sum,sub};
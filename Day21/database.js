const mongoose = require('mongoose');

async function main() {
   
  await mongoose.connect("mongodb+srv://rajgupta9044:kohliisgoat%4012@codeking.y0jmsn2.mongodb.net/Instagram");
  
}


module.exports = main;



const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL


//@ ===%40

//username //password //cluster
const url = 'mongodb+srv://rajgupta9044:kohliisgoat%4012@codeking.y0jmsn2.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'CoderKnight';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('user');

  // the following code examples can be pasted here...

// const findResult = await collection.find({});

//AGAR EK EK KARKE documents CHAHIYE 
//AGAR .toarray USE KREGE TO SARA DATA EK SATH DEGA

// for await(const doc of findResult)
// console.log(doc);

// console.log('Found documents =>', findResult);


//FOR INSERTING THE DATA

const insertResult = await collection.insertOne({ a: 1 ,names :"Raj" });
console.log('Inserted documents =>', insertResult);




  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
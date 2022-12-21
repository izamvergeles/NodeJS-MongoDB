
const express = require("express");
const {MongoClient} = require('mongodb');

const app = express();
const data = {
    car : "Audi",
    name : "Paco"

};
app.post('/hola', async function (req, res) {

    const uri = "mongodb://mongoadmin:secret@192.168.108.175:1999/?authMechanism=DEFAULT";
 
    const client = new MongoClient(uri);
    console.log(req);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        await createListing (client, req);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    
    res.send('[POST]Saludos desde express');
});
app.get('/hola', function (req, res) {

  res.send('[GET]Saludos desde express');

});
app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});

//Mongo connection

// async function main(){
    
//     const uri = "mongodb://mongoadmin:secret@192.168.108.175:1999/?authMechanism=DEFAULT";
 
//     const client = new MongoClient(uri);
 
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
 
//         // Make the appropriate DB calls
//         await  listDatabases(client);
//         //await createListing (client, data);
 
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }

// async function listDatabases(client) {
//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));

    
// };

// main().catch(console.error);



async function createListing(client, newListing){
    try{
        const result = await client.db("infiernodb").collection("notas").insertOne(newListing);
        console.log(`New listing created with the following id: ${result.insertedId}`);

    }catch{
        console.log("error");
    }
    
}
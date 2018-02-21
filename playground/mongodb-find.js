// const MongoClient = require('mongodb').MongoClient;

const {MongoClient,ObjectID} = require('mongodb');         // Object Destructing....

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log(`Connected to MongoDB Server`);
    const db = client.db('ToDoApp');

    // db.collection('ToDos').find({
    //     _id: new ObjectID('5a8682545b60e31724377c21')
    // }).toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs,undefined,2));
        
    // },(err)=>{
    //     console.log('Unable to fetch todos',err);
        
    // });

    //*********** count with promise */
    // db.collection('ToDos').find().count().then((count)=>{
    //     console.log(`Todos Count : ${count}`);
        
        
    // },(err)=>{
    //     console.log('Unable to fetch todos',err);
        
    // });
    //*********** count with callback */
    // db.collection('ToDos').find().count(true,(err,count)=>{
    //     console.log(`Todos Count : ${count}`);
        
    // });

    db.collection('Users').find({
        name: 'Anand'
    }).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
        
    },(err)=>{
        console.log('Unable to fetch todos',err);
        
    });

    client.close();
});

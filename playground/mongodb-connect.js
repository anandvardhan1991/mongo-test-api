// const MongoClient = require('mongodb').MongoClient;

const {MongoClient} = require('mongodb');         // Object Destructing....

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log(`Connected to MongoDB Server`);
    const db = client.db('ToDoApp');



    // db.collection('ToDos').insertOne({
    //     text: 'Something inserted',
    //     completed: false
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert To dos',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });


    db.collection('Users').insertOne({
        name: 'Zeeshan',
        age: 26,
        location: 'Bangalore'
    },(err,result)=>{
        if(err){
            return console.log('Unable to insert in User',err);
        }
        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
    });




    client.close();
});
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err , client)=>{
    if(err){
        return console.log(`Unable to connect to MongoDB Server`);
    }
    console.log(`Connected to MongoDB Server`);
    const db = client.db('ToDoApp');
    // Delete Many

    // db.collection('ToDos').deleteMany({text : 'test 2'}).then((result)=>{
    //     console.log(result);        
    // });

    // Delete One

    // db.collection('ToDos').deleteOne({text: 'lunch'}).then((result)=>{
    //     console.log(result);
    // });

    // FindOneAndDelete

    db.collection('ToDos').findOneAndDelete({text: 'lunch',completed: false}).then((result)=>{
        console.log(JSON.stringify(result,undefined,2));        
    });


    client.close();    
});
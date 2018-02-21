const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,client)=>{
    if(err){
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log(`Connected to MongoDB Server`);    
    const db = client.db('ToDoApp');
    //Find One and Update
    // db.collection('ToDos').findOneAndUpdate({_id: new ObjectID('5a86aa4a5b60e31724377c24')},
    // {
    //    $set:{
    //     completed : true
    //    } 
    // },{
    //     returnOriginal: false
    // }).then((result)=>{
    //     console.log(JSON.stringify(result,undefined,2));        
    // });

    // Update Name to my name and use inc operator to increament Age;

    db.collection('Users').findOneAndUpdate({_id : new ObjectID('')},
    {
        $set: {
            name : 'Anand',
            location: 'Patna'
        },
        $inc: {
            age : 1
        }
    },
    {
        returnOriginal : false
    }
    ).then((result)=>{
        console.log(JSON.stringify(result,undefined,2));
    });

});
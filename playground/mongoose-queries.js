const {mongoose} = require('../server/db/mongoose');
const {ToDos} = require('../server/models/todos');
const {ObjectID} = require('mongodb');
const {User} = require('../server/models/users');

var id = '5a8bc52df226c10928d69d5c';

if(!ObjectID.isValid(id)){
    console.log('ID is not valid'); 
};
// ToDos.find({
//     _id: id
// }).then((todos)=>{
//     if(todos.length===0){
//         return console.log('ID not Found');        
//     }
//     console.log('ToDos',todos);
// },(err)=>{
//     console.log(err);    
// });
// ToDos.findById(id).then((todo)=>{
//     console.log('ToDo by ID',todo);
// },(err)=>{
//     console.log(err);
// });

// ToDos.findOne({
//     _id: id
// }).then((todo)=>{
//     if(!todo){
//         return console.log('ID Not Found');        
//     }
//     console.log('ToDo ONe',todo);
// },(err)=>{
//     console.log(err);
// });


User.findById(id).then((user)=>{
    if(!user)
        return console.log('ID not found');        
    console.log(`User by ID ${user}`);
},(err)=>{
    console.log(err);    
});


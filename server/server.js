var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {ToDos} = require('./models/todos');
var {User} = require('./models/users');
var {ObjectID} = require('mongodb');

var app = new express();

const port = process.env.port || 3000;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var newTodo = new ToDos({
        text: req.body.text
    });
    
    newTodo.save().then((doc)=>{
        res.send(doc);        
    },(err)=>{
        res.status(400).send(err);
    })
});


app.post('/users',(req,res)=>{
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    });

    newUser.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    })
});


app.get('/todos',(req , res) => {                       //Getting all todos
    ToDos.find().then((todos)=>{
        res.send({
            todos                                       //Sending an object in response is the most viable way
        });
    },(e)=>{
        res.status(400).send(e);
    });
});


app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send({status : -1,text : 'Invalid ID Passed'});
    }
    ToDos.findById(id).then((todo)=>{
        if(!todo)
            return res.status(400).send({status : -1,text : 'Invalid ID Passed'});
        res.send(todo);
    },(err)=>{
        res.status(404).send('Invalid ID passed');       
    })
});                                                 //Getting a single Todos


app.get('/users',(req,res)=>{
    User.find().then((users)=>{
        if(!users)
            return res.status(400).send({stCode: -1,text: 'No User Found'});
        res.status(200).send(users);            
    },(err)=>{
        res.status(400).send({stCode: -1,text: 'No User Found'});     
    });
});

app.get('/users/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(404).send({status: -1,text: 'Invalid ID Passed'});
    User.findById(req.params.id).then((user)=>{
        if(!user)
            return res.status(404).send({status: -2,text: 'ID Not Found'});
        res.status(200).send(user);
    },(err)=>{
        res.status(400).send({status: -1,text: 'Invalid ID Passed'});
    });
});


app.listen(3000,()=>{
    console.log(`Started on ${port}`);    
});

module.exports = {
    app
};
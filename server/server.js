var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
const bcryptjs = require('bcryptjs');


var {mongoose} = require('./db/mongoose');
var {ToDos} = require('./models/todos');
var {User} = require('./models/users');
var {authenticate} = require('./middleware/authenticate');
var {ObjectID} = require('mongodb');

var app = new express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req,res)=>{
    var newTodo = new ToDos({
        text: req.body.text,
        _creator : req.user._id
    });
    
    newTodo.save().then((doc)=>{
        res.send(doc);        
    },(err)=>{
        res.status(400).send(err);
    })
});


app.post('/users',(req,res)=>{
    var body = _.pick(req.body,['name','email','password']);
    var newUser = new User(body
        // {
        // name : body.name,
        // email: body.email,
        // password: body.password
    // }
    );

    newUser.save().then(()=>{
        // res.send(doc);
        return newUser.generateAuthToken();
    },(err)=>{
        res.status(400).send(err);
    }).then((token)=>{
        res.header('x-auth',token).send(newUser);
    })
});


app.get('/todos',authenticate , (req , res) => {                       //Getting all todos
    ToDos.find({
        _creator: req.user._id
    }).then((todos)=>{
        res.send({
            todos                                       //Sending an object in response is the most viable way
        });
    },(e)=>{
        res.status(400).send(e);
    });
});


app.get('/todos/:id',authenticate , (req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send({status : -1,text : 'Invalid ID Passed'});
    }
    ToDos.findOne({
        _id : id,
        _creator: req.user._id
    }).then((todo)=>{
        if(!todo)
            return res.status(400).send({status : -1,text : 'Invalid ID Passed'});
        res.status(200).send(todo);
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



app.get('/auth/token',authenticate,(req,res)=>{
    res.send(req.user);    
});

app.post('/users/login' , (req,res)=>{
    var body = _.pick(req.body,['email','password']);

    User.findByCred(body.email,body.password).then((user)=>{
        user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        },(err)=>{
            res.status(400).send();
        });
    },(err)=>{
        res.status(400).send();
    })
});

app.delete('/todos/:id',authenticate,(req,res)=>{
    var id = req.params.id;
    ToDos.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo)=>{
        if(!todo)
            return res.status(404).send();
        res.status(200).send(todo);
    },(err)=>{
        res.status(404).send();
    });
});

app.delete('/users/logout',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },()=>{
        res.status(400).send();
    });
});

app.patch('/todos/:id',authenticate,(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed)
        body.completedAt = new Date().getTime();
    else {
        body.completedAt = null;
        body.completed = false;
    }

    ToDos.findOneAndUpdate({
        _id : id,
        _creator : req.user._id
    },{$set : body},{new : true}).then((todo)=>{
        if(!todo)
            return res.status(404).send();
        res.status(200).send(todo);
    },(err)=>{
        res.status(404).send();
    });
});


app.listen(port,()=>{
    console.log(`Started on ${port}`);    
});

module.exports = {
    app
};
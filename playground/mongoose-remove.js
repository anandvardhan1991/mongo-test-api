const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {ToDos} = require('./../server/models/todos');
const {User} = require('./../server/models/users');

//Todo.remove({})                           // Will remove everything from the collection.

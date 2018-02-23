const mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://anandvardhan1991:suchitradevi@ds245228.mlab.com:45228/todoapp");   //Live
mongoose.connect("mongodb://localhost:27017/ToDoApp");                                            //Local

module.exports = {
    mongoose,
    Schema
}
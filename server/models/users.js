var {mongoose,Schema} = require('../db/mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        requrired: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    }
});

var User = mongoose.model('User',userSchema);

module.exports = {
    User
}
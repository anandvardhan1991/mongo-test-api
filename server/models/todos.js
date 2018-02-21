var {mongoose,Schema} = require('../db/mongoose');


var toDoSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

var ToDos = mongoose.model('ToDo', toDoSchema
// {
//     text: {
//         type: String
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: 0
//     }
// }
);

module.exports = {
    ToDos
}

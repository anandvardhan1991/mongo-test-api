var {mongoose,Schema} = require('../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcryptjs = require('bcryptjs');


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
        trim: true,
        unique : true,
        validate : {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength : 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(),access},'abc123').toString();   
    user.tokens = user.tokens.concat([{access,token}]);                           // Adding to the array tokens
    return user.save().then(()=>{
        return token;
    });
};

userSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try{
        decoded = jwt.verify(token,'abc123');        
    } catch(e){
        // return new Promise((resolve,reject)=>{
        //     reject();
        // });
        // Alternate way *********
        return Promise.reject();
    }
    return User.findOne({
        '_id' : decoded._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    });
};

userSchema.statics.findByCred = function(email,password){
    var User = this;
    
    return User.findOne({email}).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        return new Promise((resolve,reject)=>{
            bcryptjs.compare(password,user.password,(err,res)=>{
                if(res){
                    console.log('Resolve');
                    
                    resolve(user);
                }
                else { 
                    console.log('Reject');
                    reject();
                }
            });
        });
    },(err)=>{
        return new Promise.reject();
    });
};

userSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject,['_id','name','email']);
};

userSchema.pre('save',function (next){
    var user = this;    
    if(user.isModified('password')){
        bcryptjs.genSalt(10,(err,salt)=>{
            bcryptjs.hash(user.password,salt,(err,hash)=>{
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
},(err)=>{
    
});

userSchema.methods.removeToken = function (token){
    var user = this;

    return user.update({
        $pull: {
            tokens: {
                token
            }
        }
    });
};


var User = mongoose.model('User',userSchema);

module.exports = {
    User
};
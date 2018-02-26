var {User} = require('../models/users');
var authenticate = (req,res,next)=>{
    var token = req.get('x-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    },(err)=>{
        res.status(401).send({status: -1,text: 'Bad Authentication'});
    });   
};

module.exports = {
    authenticate
};
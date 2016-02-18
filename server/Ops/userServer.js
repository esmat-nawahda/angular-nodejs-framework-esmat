var User = require('../models/user');
var config = require('../../config');

var secretKey = config.secretKey;


//  json obj keep token in local story (deal with it in any time)
var jsonwebtoken = require('jsonwebtoken');



function createToken (user) {
// sign : function exist inside the jsonwebtoken
    var token = jsonwebtoken.sign({
        id: user._id,
        name: user.name,
        username: user.username
    },  secretKey, {
        expirtestInMinute: 1440
    });

    return token;

}



//Main Parser
module.exports = function(opcode,req,res) {
    if(opcode === 'register'){
        register(req,res);
    }
    else if(opcode === 'login'){
        login(req,res);
    }
}


//Register
function register(req, res){
    console.log("server");
    var user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    var token = createToken(user);

    user.save(function(err) {
        if(err){
            // res to return it from server
            res.send(err);
            return;
        }
        res.json({
            success: true,
            message: 'User has been created !',
            token: token
        });

    });
}


//Login
function login(req, res){
    console.log("server");
    User.findOne({
        email: req.body.email
    }).select('fullname username password').exec(function(err, user) {

        if(err) throw err;

        if(!user) {

            res.send({ message: "User doesn't exist"});
        } else if(user){

            var validPassword = user.comparePassword(req.body.password);

            if(!validPassword) {
                res.send({ message: "Invalid Password"});
            } else {

                //when suucces (means user successful login to the website)
                // can recall all your information in token
                // after this we need jsonwebtoken
                var token = createToken(user);


                res.json({
                    success: true,
                    message: "Successfuly login!",
                    token: token
                });

            }
        }
    });
}



// user schema

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({

 fullname: String,
 username: { type: String, required: true, index: { unique: true }},
 password: { type: String, required: true, select: false},
 email: { type: String, required: true, index: { unique: true }}

});

// hashing password


UserSchema.pre('save', function(next) {

 var user = this;
 if(!user.isModified('password')) return next();
  bcrypt.hash(user.password, null, null, function(err, hash){
 if(err) return next(err);

 user.password = hash;
 next();
 });

 });

// create a custom methode

// function working multithread to prevent program fron stopping
UserSchema.methods.comparePassword = function(password) {

 var user = this;

 return bcrypt.compareSync(password, user.password);
 
}

// modulle >> big obj
// to add key value for config (key:use , value: all infor)
// User : key to store user infor
module.exports = mongoose.model('User', UserSchema);




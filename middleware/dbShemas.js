var AuthError = require('./error').AuthError;
var crypto = require('crypto');
var mongoose = require('mongoose');
var config = require('../config');
var util = require('util');

//console.log('mongooseClientConOpt: ',config.get('mongoose:options'),' ,url: ',config.get('mongoose:url'));
mongoose.connect(config.get('mongoose:url'), config.get('mongoose:options'));

var user = new mongoose.Schema({
    username: {type: String, unique: true, required: true},//lowercase: true,
    age: Number,
    email: { type: String, lowercase: true, unique: true },
    password: {type: String, required: true},
});


// //User methods
// user.virtual('password').set(function (password) {
//         this._plainPassword = password;
//         this.salt = Math.random() + '';
//         this.password = this.encryptPassword(password);
//     });
//
// user.virtual('password').get(function () {
//         return this._plainPassword;
//     });
//
// user.methods.encryptPassword = function (password) {
//     return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
// };
//
// user.methods.checkPassword = function (password) {
//     return this.encryptPassword(password) === this.password;
// };
//
//
//
//
// user.statics.findOneAndCheckPass = async function (data) {
//     let User = this;
//     let user = {};
//     let err = {};
//     console.log('findOneAndCheckPass data: ',data);
//     try {
//         user = await User.findOne({username: data.username});
//         if(user.checkPassword(data.password)) {
//             return {err:null,user:user};
//         } else {
//             err = new AuthError("Password is incorrect");
//             console.log('user.err: ',err);
//             return {err:err,user:null};
//         }
//
//     } catch(err) {
//         console.log('findOneAndCheckPass err: ',err);
//         return {err:err,user:null};
//     }
//
// };
//
// user.statics.authorize = async function(paramAuth) {
//     let User = this;
//     let user = {};
//     let err = {};
//     try {
//         user = await User.findOne({username: paramAuth.username});
//         console.log('async user:',user);
//         if (user) {
//             if(user.checkPassword(paramAuth.password)) {
//                 return {err:null,user:user};
//             } else {
//                 err = new AuthError("Password is incorrect");
//                 console.log('user.err: ',err);
//                 return {err:err,user:null};
//             }
//         } else {
//             err = new AuthError("User not found! ");
//             console.log('user.err: ',err);
//             return {err:err,user:null};
//         }
//     } catch (err) {
//         console.log('authorize err: ',err);
//         return {err:err,user:null};
//     }
// };

//
module.exports.User = mongoose.model('User', user);







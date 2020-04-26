const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const userSchema = Schema({
    fName: String,
    lName: String,
    email: String,
    password: String
});

userSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id}, "mysecretkey"); 
    return token;
}

module.exports = mongoose.model('user', userSchema);
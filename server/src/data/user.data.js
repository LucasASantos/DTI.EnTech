const mongoose = require('mongoose')

module.exports= mongoose.model('User',{    
    name: String,
    type: String,
    email: String,
    password: String,
    photoURL: String,
    status: String
});
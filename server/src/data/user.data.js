const mongoose = require('mongoose')

module.exports= mongoose.model('User',{    
    name: String,
    type: String,
    email: String,
    senha: String,
    photoURL: String,
    status: String
});
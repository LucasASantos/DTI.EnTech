const mongoose = require('mongoose')

module.exports= mongoose.model('Survey',{    
    title: String,
    date: Date,
    startTime: Date,
    endTime: Date,
    address: String,
    city: String,
    state: {type: String, minlength: 2, maxlength:2},
    photoURL: String
});
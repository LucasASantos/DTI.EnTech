const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports= mongoose.model('Survey',{    
    title: String,
    date: Date,
    startTime: Date,
    endTime: Date,
    numberWinners:Number,
    surveyEndDate: Date,
    address: String,
    city: String,
    userId: ObjectId,
    state: {type: String, minlength: 2, maxlength:2},
    photoURL: String,
    process: Boolean
});
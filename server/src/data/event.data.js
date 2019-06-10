const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports= mongoose.model('Event',{    
    title: String,
    date: Date,
    startTime: Date,
    endTime: Date,
    address: String,
    city: String,
    userId: ObjectId,
    state: {type: String, minlength: 2, maxlength:2},
    techshots: [{
        title: String,
        description: String,
        speaker : String,
        duration: Number,
        keywords: [String],
    }],
    photoURL: String,
    comments:[{
        userId:ObjectId,
        name: String,
        comment:String,
    }],
    like: {count: Number, likes:[{
        userId:ObjectId,
    }]}
});
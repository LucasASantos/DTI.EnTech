const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports= mongoose.model('Techshot',{    
    title: String,
    description: String,
    speaker : String,
    duration: Number,
    keywords: [String],
    userId: ObjectId,
    surveyId: ObjectId,
    photoUrl: String
});
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const UserSchema = new mongoose.Schema({
    name: String,
    type: String,
    email: { type: String },
    password: { type: String, select: false },
    photoURL: String,
    status: String,
    refenceId: Number,
    metodLogin:String
});

UserSchema.pre('save', async function (next) {
    if (this.password != undefined) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
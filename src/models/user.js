
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    mobile_no:{
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
    },
    user_type:{
        type:String,
        enum: ['user','admin'],
        default : 'user'
    },
},{timestamps: true}));
exports.User = User;

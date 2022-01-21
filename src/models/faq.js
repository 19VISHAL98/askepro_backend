
const mongoose = require('mongoose');
const Faq = mongoose.model('Faq', new mongoose.Schema({
    question:{
        type: String,
        required : true
    },
    answer:{
        type:String,
        required: true
    }
},{timestamp: true}));
exports.Faq =  Faq;

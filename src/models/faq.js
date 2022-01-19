
const mongoose = require('[mongoose')
const Faq = mongoose.model('Faq',new mongoose.schema({
    question:{
        type: String,
        required : true
    },
    answer:{
        type:String,
        required: true
    }
}));
exports.Faq=  Faq;

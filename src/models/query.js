
const mongoose =require('mongoose')
const Query = mongoose.model('Query', new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type: String,
        required:true
    },
    query:{
        type:String,
        required : true
    },
    status: {
        type: String,
        required: true,
        enum: ["open", "resolved"],
        default: "open"
    }
},{timestamps: true}));
exports.Query = Query;
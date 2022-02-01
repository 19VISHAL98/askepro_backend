const mongoose = require('mongoose');
const Document= mongoose.model('Document', new mongoose.Schema({
    name:String,
    image:String,
    status:String,
     client_id:[{type:'ObjectId', ref:'client'}] ,
},{timestamps: true}));
exports.Document = Document;

 
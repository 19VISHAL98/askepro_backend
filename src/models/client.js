
const mongoose = require('mongoose');

const Client= mongoose.model('Client', new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
     
    },
    mobile_no:{
        type: Number,
    },
    address:{
        type: String
    },
    location: String,
    dob:{
        type:Date
    },
    
 services_id:[{type:'ObjectId', ref:'Services'}] ,
 category_id:[{type:'ObjectId', ref:'Category'}] ,
 sub_category_id:[{type:'ObjectId', ref:'Sub_Category'}] ,
    
},{timestamps: true}));
exports.Client = Client;

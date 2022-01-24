
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
    dob:{
        type:Date
    },
    
 services_id:Number ,
 category_id:Number ,
 sub_category_id:Number ,
    
},{timestamps: true}));
exports.Client = Client;

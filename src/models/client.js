
const mongoose = require('mongoose');

const Client= mongoose.model('Client', new mongoose.Schema({
    name:String,
    email: String,
    mobile_no: Number,
    address :String,
    location: String,
    dob:Date,
    appointments:Date,
    status:String,
    Payment_mode:{
        type:String,
        enum: ['credit', 'debit' , 'netbanking'],
    },
    Priority:{
        type:String,
        enum:('normal','urgent')
    } ,
    Transaction_Id: String,
    Amount_AED: Number,
     services_id:[{type:'ObjectId', ref:'Services'}] ,
     category_id:[{type:'ObjectId', ref:'Category'}] ,
     sub_category_id:[{type:'ObjectId', ref:'Sub_Category'}] ,
     document_id:[{type:'ObjectId', ref:'Sub_Category'}]
    
},{timestamps: true}));
exports.Client = Client;

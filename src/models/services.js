
const mongoose = require('mongoose');

const Services = mongoose.model('Services', new mongoose.Schema({
    services_name: {
        type: String, 
    },
    description:{
        type:String
    },
    image: {
        type: String, 
    },
   
},{timestamps: true}));
exports.Services = Services;


const mongoose = require('mongoose');

const Offers = mongoose.model('Offers', new mongoose.Schema({
    name: {
        type: String,
        
      
    },
    image: {
        type: String,
       
       
    },
   
},{timestamps: true}));
exports.Offers = Offers;

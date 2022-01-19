
const mongoose = require('mongoose');

const Offers = mongoose.model('Offers', new mongoose.Schema({
    name: {
        type: String,
        required: true,
      
    },
    image: {
        type: String,
        required: true,
       
    },
   
}));
exports.Offers = Offers;

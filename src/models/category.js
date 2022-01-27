
const mongoose = require('mongoose');

const Category = mongoose.model('Category', new mongoose.Schema({
   category_name: {
        type: String,
    },
    services_id:[{type:'ObjectId', ref:'Services'}]
   
},{timestamps: true}));
exports.Category = Category;

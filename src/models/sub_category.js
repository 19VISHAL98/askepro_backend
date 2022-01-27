
const mongoose = require('mongoose');

const Sub_Category = mongoose.model('Sub_Category', new mongoose.Schema({
   sub_category_name: String,
   fees :Number,
   discount:Number,
   document:String,
  category_id:[{type:'ObjectId', ref:'Category'}]
   
},{timestamps: true}));
exports.Sub_Category = Sub_Category;

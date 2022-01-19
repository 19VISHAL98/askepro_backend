const mongoose = require('mongoose');
const db =mongoose.connect("mongodb://localhost:27017/mydbss")
.then(() => console.log('Now connected to MongoDB!'))
.catch(err => json.error('Something went wrong', err));
module.exports = {db}
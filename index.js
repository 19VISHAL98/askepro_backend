
const mongoose = require('mongoose');
const cors = require('cors')
const express = require('express');
const path = require ('path')
const app = express();
const {db} = require('./src/lib/db');
const {Category} = require('./src/models/category')
const router = require('./src/routes/router');
const bodyParser= require('body-parser')
const{options} = require('./src/uploads/path')
app.use(express.json());
app.use (express.urlencoded({ extended: true }))
app.use(express.static('./src/uploads'))
app.use(router);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
 
 
//-----------------------------------------prectic-----------

let arrA = [{boy:"ram", girl:"sita",gay:"gay"},{boy:"shaym", girl:"mihaliph",gay:"gay"}];
let arrB = [{boy:"vinsy", girl:"sita",gay:"gay"},{boy:"shaym", girl:"mihaliph",gay:"gay"}];
let n = [[{a:"a"},{b:"b"}],[{a:"sd"}]];
let m = ["a","b","c"]
//categ = category_name.forEach(category_name =>Category.insertMany({category_name:category_name}) )
//console.log(categ)//

//arr.forEach(arr=>console.log(arr))
m.forEach(k => {
    n.forEach(i => {
        console.log(i,k)
    });
})

console.log(n)
console.log(m)


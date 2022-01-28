
const mongoose = require('mongoose');
const express = require('express');
const path = require ('path')
const app = express();
const {db} = require('./src/lib/db');
const {Sub_Category} = require('./src/models/sub_category')
const router = require('./src/routes/router');
const bodyParser= require('body-parser')
const{options} = require('./src/uploads/path')
const cors = require('cors');
const index = require('uuid-random');

app.use(cors());
app.use(express.json());
app.use (express.urlencoded({ extended: true }))
app.use(express.static('./src/uploads'))
app.use(router);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

 
 
//----------------------------------------- prashant bro -----------
// var m = ["61ef9e019f8957bbc12bdebc","61ef9e019f8957bbc12bdebd"];
// var n = [[{sub_category_name:"a", fess:"12", discount:"3"}, {sub_category_name:"b", fess:"120", discount:"30"}],[{sub_category_name:"c", fess:"12", discount:"4"}, {sub_category_name:"d", fess:"120", discount:"40"}]]

// m.forEach((k, index) => {
//     n.forEach((i, index2) => {
//         if(index == index2){
//               //  console.log(m[index], n[index2])
//             //   console.log(m[index])
//             //   n[index2].forEach(s=>console.log(s.sub_category_name))
//             let arr = [];
//             n[index2].forEach(myFunction);
//             function myFunction(item) {
//             sum = new Sub_Category({sub_category_name:item.sub_category_name, fess:item.fees, discount:item.discount, category_id:m[index]})
//            sum.save() 
//             arr.push(sum);
//             }
//             console.log(arr)
                
//         }
//     });
// });
// console.log(Sub_Category)




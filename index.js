
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const {db} = require('./src/lib/db');
const router = require('./src/routes/router');
app.use(express.json());
app.use(router);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
 
 

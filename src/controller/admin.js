const fs = require('fs')
const {options}= require('../uploads/path')
const{upload} = require('../middleware/multer')
const offer = (req, res, )=> {
	upload(req,res,function(err) {

		if(err) {
			res.send(err)
		}
		else {
			res.send("Success, Image uploaded!")
		}
	})
}

const services=(req, res)=>{
    console.log(options)
    var fileName = 'mypic-635f0112-4417-46d2-a649-59d64e6f7ea4.pdf';
    res.sendFile(fileName, options);
}
module.exports = {offer , services}

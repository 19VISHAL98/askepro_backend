const path = require('path')
const multer = require("multer")
var storage = multer.diskStorage({
	destination: (req, file, cb)=> {
		cb(null, "src/uploads")
	},
	filename: (req, file, cb) =>{
		let ext = path.extname(file.originalname)
		cb(null, Date.now() + ext)
	 
	}

})
	
var upload = multer({
	storage: storage, 
	fileFilter: function (req, file, cb){
		if(file.mimetype == "image/png" ||
		file.mimetype == "image/jpg"){
			cb(null, true)
		}else{
			console.log("only pnj & jpg file supported")
			cb(null, false)
		}
	},
	limits:{
             fileSize : 1024 * 1024 * 2
	}	
		
})
 module.exports = {
     upload,
 }
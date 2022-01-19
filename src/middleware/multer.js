const path = require('path')
const multer = require("multer")
var uuid = require('uuid-random');
var storage = multer.diskStorage({
	destination: (req, file, cb)=> {
		cb(null, "src/uploads")
	},
	filename: (req, file, cb) =>{
		
	cb(null, file.fieldname + "-" +uuid()+ path.extname(file.originalname))
	}
})
const maxSize = 1 * 1000 * 1000;
	
var upload = multer({
	storage: storage,
	limits: { fileSize: maxSize },
	fileFilter: function (req, file, cb){
		var filetypes = /jpeg|jpg|png|pdf/;
        
		var mimetype = filetypes.test(file.mimetype);

		var extname = filetypes.test(path.extname(
					file.originalname).toLowerCase());
                    
		
		if (mimetype && extname) {
			return cb(null, true);
		}
	
		cb("Error: File upload only supports the "
				+ "following filetypes - " + filetypes);
	}
}).single("mypic");	
 module.exports = {
     upload
 }
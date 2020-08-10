const multer = require('multer')
const path = require('path')
const crypto = require('crypto');

let multerObj = {

	storage : multer.diskStorage({
		destination:'public',
		filename:(req, file, cb)=>{
			console.log('Multer File',file)
			cb(null, file.originalname)
		}
	}),	
}

var upload = multer({
	storage:multerObj.storage,
	limits:{fileSize:10000000},
	fileFilter: (req, file, cb) => {
		if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
		  cb(null, true);
		} else {
		  cb(null, false);
		  return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
		}
	}
})


module.exports = upload
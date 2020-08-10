const tokenOperation = require('./tokenOperation')
const Common = require('./common')
const cmnclass = new Common()

response = {}

function checkToken(req,res,err){

	var token = req.header['authorization']

	if(token){
		tokenOperation.verifyToken(token)
		response = cmnclass.generateResponse(200, false, "Token is verified", token)
		return res.status(response.status).send(response)
	}
	else{
		console.log(err)
		response = cmnclass.generateResponse(403, false, "Token is not verified", err)
		return res.status(response.status).send(response)
	}
}

module.exports = checkToken
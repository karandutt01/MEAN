const jwt = require('jsonwebtoken')


const tokenOperation = {
	generateToken(email) {
		var token = jwt.sign({email}, 'Mysecret', { expiresIn: '1h' })
		return token
	},
	
	verifyToken(token) {
		
		var decodedToken = jwt.verify(token, 'Mysecret')
		console.log('decodedTokkkkkkkken', decodedToken)
		return decodedToken
	}
}

module.exports = tokenOperation
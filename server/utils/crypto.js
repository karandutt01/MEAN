const crypto = require('crypto')

function genPassword(password){
	var salt = crypto.randomBytes(16).toString('hex')
	var hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
	 
	return {
		salt: salt,
		hash: hash
	}
}

function validPassword(password, salt, hash){
	var hashverify = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
	return hash == hashverify
}

module.exports = {
	genPassword,
	validPassword
}
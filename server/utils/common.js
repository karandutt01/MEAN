

class Common {

	generateResponse(status, error, message, data) {
		let resObj = {}
		resObj.status = status
		resObj.message = message
		resObj.error = error

		data !== null ? resObj.data = data : null
		return resObj	
	}
}

module.exports = Common
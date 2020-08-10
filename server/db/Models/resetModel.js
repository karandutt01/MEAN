const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resetSchema = new Schema({
	resetLink:Schema.Types.Mixed,
})

const resetModel = mongoose.model('resetLink', resetSchema)

module.exports = resetModel
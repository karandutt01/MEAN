const mongoose = require('mongoose')
const moment = require('moment')
const BannerSchema = new mongoose.Schema({
	originalname: { type: String },
	path: { type: String},
	base64: { type:String},
	mimetype:{type:String},
	role:{type:String, default:'Admin'},
	date:{type:String, default:moment().format("YYYY-MM-DD")},
})

const BannerModel = mongoose.model('Banner', BannerSchema)

module.exports = BannerModel
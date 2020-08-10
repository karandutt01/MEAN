const mongoose = require('mongoose')
const subcatSchema = new mongoose.Schema({

	categoryId:mongoose.Schema.Types.ObjectId,
	role:{type:String, default:'Admin'},
	mensubcat:String,
	esubcat:String
})

const subcatModel = mongoose.model('subcategory', subcatSchema)
module.exports = subcatModel
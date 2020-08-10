const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegisterSchema = new Schema({

	firstname:{type:String, required:true},
	lastname:{type:String, required:true},
	email:{type:String, required:true},
	password: { type:Schema.Types.Mixed,required:true},
	role:{type:String, default:'Customer'}
	
})

const RegisterModel = mongoose.model('Register',RegisterSchema)

module.exports = RegisterModel
const mongoose = require('mongoose')
const RoleRightSchema = new mongoose.Schema({

	role:{type:String, required:true, unique:true},
	rights:{
		MainMenu : [{
			name:String,
		}],

	},
})

const RoleRightModel = mongoose.model('roleRight', RoleRightSchema)
module.exports = RoleRightModel
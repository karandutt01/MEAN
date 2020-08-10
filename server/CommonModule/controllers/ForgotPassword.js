const RegisterModel = require('../../db/Models/RegisterModel')
const nodeMailer = require('../../utils/nodeMailer').createTransport
const resetModel = require('../../db/Models/resetModel')
const bcrypt = require('bcrypt')
const common = require('../../utils/common')
var cmncls = new common()

forgetbyemail = (req,res)=>{

		try {

			let obj = {
				email:req.body.email,
				resetLink:req.body.resetLink
			}
			RegisterModel.findOne({email:obj.email}, (err, user)=>{

			if(err){
				console.log(err)
				response = cmncls.generateResponse(400, true, 'Something went wrong', err)
				res.status(response.status).send(response)

			}else {

				if(!user){
					response = cmncls.generateResponse(404, true, 'User Not Found', null)
					res.status(response.status).send(response)

				}else{

					resetModel.create({resetLink:obj.resetLink}, (err, data)=>{
						if(err){
							console.log(err)
							response = cmncls.generateResponse(400, true, 'Reset Link Error', null)
							res.status(response.status).send(response)
						}
						else{

							let msg = `<h4>Please click on the link below to reset your password.</h4>
								<p>Click <a href ='http://localhost:4200/forgetPassword/resetPassword?resetLink=${obj.resetLink}'>here</a></p>`

							nodeMailer('Mail for Forget Password', msg)

							response = cmncls.generateResponse(200, false, 'Mail Sent to User')
							res.status(response.status).send(response)

						}
					})
					
				}
			}
		})
	}

	catch(e){
		console.log(e)
		response = cmncls.generateResponse(500, true, 'Internal Server Error', e)
		res.status(response.status).send(response)
	}

}


resetPassword = (req,res)=>{

	try{

		let obj = {
			newpass : req.body.newpass,
			cnfpass : req.body.cnfpass,
			resetlink:req.body.resetlink
		}

		console.log(req.body)
		
		resetModel.findOne({resetLink:obj.resetlink}, (err, data)=>{
			if(err){
				console.log(err)
				response = cmncls.generateResponse(400, true, 'Reset Link does not match', err)
				res.status(response.status).send(response)
			}

			else{

				if(obj.newPass != obj.confirmPass){
					response = cmncls.generateResponse(400, true, 'Password does not match', null)
					res.status(response.status).send(response)
				}

				else{
					
					RegisterModel.updateMany({$set:{password:obj.cnfpass}}, (err,data)=>{
						if(err){
							console.log(err)
							response = cmncls.generateResponse(400, true, 'Something went wrong', err)
							res.status(response.status).send(response)
						}

						else{
							console.log(data)
							response = cmncls.generateResponse(200, false, 'Password has been changed', data)
							res.status(response.status).send(response)
						}
					})
				}
			}
		})
	}

	catch(e){
		console.log(e)
		response = cmncls.generateResponse(500, true, 'Internal Server Error', data)
		res.status(response.status).send(response)
	}	
}

module.exports = {
	forgetbyemail,
	resetPassword
}


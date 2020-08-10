const RegisterModel = require('../../db/Models/RegisterModel')
const bcrypt = require('bcrypt')
const Common = require('../../utils/common')
const cmnclass = new Common()
const jwt = require('../../utils/tokenOperation')

var response = {}

class Auth {
	
	register = (req, res)=>{

		try {


			bcrypt.hash(req.body.password, 17, (err, hash)=>{

				let obj = {

					firstname:req.body.firstname,
					lastname:req.body.lastname,
					email:req.body.email,
					password: hash
					
				}

				RegisterModel.create(obj, (err, data)=>{
					if (data != null){
	
						console.log(data)
						response = cmnclass.generateResponse(200, false, 'Account successfully Created', data)
						return res.status(response.status).send(response)
	
					}
					else {
						console.log(err)
						response = cmnclass.generateResponse(200, true, 'Something Went Wrong', err)
						return res.status(response.status).send(response)
					}
				})

			})
				
		}

		catch(e){
			console.log(e)
			response = cmnclass.generateResponse(500, true, "Internal Server Error", null)
			return res.status(response.status).send(response)
		}

	}
	

	login = (req,res)=>{
		

		try {

			let obj = {
				email:req.body.email,
				password:req.body.password,
			}

			console.log(req.body)
			// bcrypt.compare(obj, 17, (err, hash)=>{

				
			// 	console.log('login hash', hash)
			// 	if(err){
			// 		console.log('hashError', err)
			// 	}


				RegisterModel.findOne({email:obj.email, password:obj.password}, (err,data)=>{
					if(err || data == null){
	
						console.log('Errrrrrrrrrrr',err)
						response = cmnclass.generateResponse(200, true, 'Invalid Username or Password', err)
						return res.status(response.status).send(response)
					}
	
					else {
	
							console.log('Login Dattaaaaa',data)
							const token = jwt.generateToken(data.email)
							response = cmnclass.generateResponse(200, false, 'Login Successfully', token)
							return res.status(response.status).send(response)
						}
					})
			// })
			
		}

		catch(e){

			console.log(e)
			response = cmnclass.generateResponse(500, true, "Internal Server Error", null)
			return res.status(response.status).send(response)
		}
	}


	findAdmin = (req, res)=>{

		try {

			// console.log()
			RegisterModel.findOne({email:'admin@gmail.com'}, (err, doc)=>{
				if(err){
	
					console.log(err)
					response = cmnclass.generateResponse(500, true, 'System Failure', err)
					return res.status(response.status).send(response)
				}
	
				else{
	
					if(!doc){
	
						
						console.log('Going to add Admin')
						this.addAdmin()
						// response = cmnclass.generateResponse(200, false, 'Going to add Admin', doc)
						// return res.status(response.status).send(response)
	
					}else{
	
						console.log('Admin already Added',doc)
						// response = cmnclass.generateResponse(200, false, 'Admin already Added', doc)
						// return res.status(response.status).send(response)
					}
	
				}
			})
		}
		catch(e){

			console.log(e)
			response = cmnclass.generateResponse(500, true, "Internal Server Error", null)
			return res.status(response.status).send(response)
		}
	}

	addAdmin = (req,res)=>{

		try {
			
			let obj = {

				firstname:'E-Admin',
				lastname:'flipkart',
				email:'admin@gmail.com',
				password:'admin',
				role:'Admin'
	
			}
	
			RegisterModel.create(obj, (err, data)=>{
				if(err){
	
					console.log(err)
					response = cmnclass.generateResponse(500, true, 'Error in Admin Creation', err)
					return res.status(response.status).send(response)
	
				}else{
	
					response = cmnclass.generateResponse(200, false, 'Admin & Rights Added Successfully', data)
					const roleRight = require('../controllers/RoleRightCtrler')
					roleRight.roleRightCreation.addRoleRights('Admin',{MainMenu:[{name:'Men'}, {name:'House&Furniture'}, {name:'Electronics'}]})

					console.log('responsee', response)
					
				}
	
			})
		}
		catch(e){

			console.log(e)
			response = cmnclass.generateResponse(500, true, "Internal Server Error", null)
			return res.status(response.status).send(response)
		}
		
	}

		
		
}

module.exports = Auth

const RoleRightModel = require('../../db/Models/Role&Rights')
const Common = require('../../utils/common')
const subcatModel = require('../../db/Models/subcategory')
const sharp = require('sharp')
const BannerModel = require('../../db/Models/Banner')
let common = new Common()

var response = {}



const roleRightCreation = {

	addRoleRights(role,rights){

		try{

			RoleRightModel.insertMany({role:role,rights:rights}, (err, data)=>{
				if(err){
	
					console.log('Error in role creation',err)

				}else{

					console.log('Role Creation',data)
				}	
			})
		}

		catch(e){
			console.log(e)
		}
	},
}

getRoleRights = (req,res)=>{

	try {

		RoleRightModel.find({role:'Admin'}, (err, doc)=>{
			if(err){
				console.log(err)
				response = common.generateResponse(500, true, 'Error occured getting rights', err)
				res.status(response.status).send(response)
			}

			else{

				if(!doc){
					console.log('Role not found')
					response = common.generateResponse(500, true, 'Role Not Found', doc)
					return res.status(response.status).send(response)

				}else{

					console.log('Role Found')
					response = common.generateResponse(200, false, 'Role Found', doc)
					return res.status(response.status).send(response)

				}	
			}
		})
	}

	catch(e){
		console.log(e)
		response = common.generateResponse(500, true, 'Internal server Error', e)
		res.status(response.status).send(response)
	}
}



editMenus = (req,res)=>{

	try {

		let id = req.body.id
		let menuName = req.body.name

		console.log('Request Object',id, menuName)
		if(id && menuName == null || id && menuName == ''){

			console.log('Field is null')
			response = common.generateResponse(400, true, 'Field is empty', null)
			res.status(response.status).send(response)
		}

		RoleRightModel.findOneAndUpdate({"rights.MainMenu._id":id}, 
		{$set:{"rights.MainMenu.$.name":menuName}}).then(doc=>{
			if(!doc){

				console.log('Error in Doc',doc)
				response = common.generateResponse(200, true, 'Error occured during updation', doc)
				res.status(response.status).send(response)
			}
			else{

				console.log('Doc Updated',doc)
				response = common.generateResponse(200, false, 'Menu Updated', doc)
				res.status(response.status).send(response)
			}

		})
		.catch(err=>{

			console.log('Err',err)
			response = common.generateResponse(400, true, 'Bad Request', err)
			res.status(response.status).send(response)
		})
	}
	catch(e){

		console.log(e)
		response = common.generateResponse(500, true, 'Internal server Error', e)
		res.status(response.status).send(response)
	}
}


deleteMenu = (req,res)=>{
	try{

		let id = req.params.id
		let name = req.params.name
		console.log(id, name)

		if(id && name == null || id && name == ''){

			console.log('Field is null')
			response = common.generateResponse(400, true, 'Field is empty', null)
			res.status(response.status).send(response)
		}

		else{

			RoleRightModel.update({"rights.MainMenu._id":id},
			{$pull:{'rights.MainMenu':{name:name}}}, { safe: true, multi:true }, (err, doc)=>{

				if(doc){

					console.log('Doc deleted',doc)
					response = common.generateResponse(200, false, 'Menu deleted', doc)
					res.status(response.status).send(response)
				}

				else{

					console.log('Error occured during deletion',err)
					response = common.generateResponse(400, true, 'Menu not deleted', err)
					res.status(response.status).send(response)
				}
			})
		}
	}
	catch(e){

		console.log(e)
		response = common.generateResponse(500, true, 'Internal server Error', e)
		res.status(response.status).send(response)
	}
}


Addsubmenu = (req,res)=>{

	let id = req.params.id
	let obj = {

		categoryId:id,
		mensubcat:req.body.subcat,
		esubcat:req.body.subcat2,
	}

	console.log(id)

	try{
		
		subcatModel.insertMany(obj, (err, result)=>{

			if(err){

				console.log(err)
				response = common.generateResponse(400, true, 'Subcategory could not be created', err)
				return res.status(response.status).send(response)
			}

			else if (obj.mensubcat == '' || obj.esubcat == null){

				response = common.generateResponse(400, true, 'Men Subcategory could not be empty', null)
				return res.status(response.status).send(response)
			}

			else if (obj.esubcat == '' || obj.esubcat == null){

				response = common.generateResponse(400, true, 'Electronics Subcategory could not be empty', null)
				return res.status(response.status).send(response)
			}

			else{

				console.log(result)
				response = common.generateResponse(200, false, 'Subcategory created', result)
				return res.status(response.status).send(response)
			}
		})
		
	}
	catch(e){

		console.log(e)
		response = common.generateResponse(500, true, 'Internal server Error', e)
		res.status(response.status).send(response)
	}
}


getSubMenu = (req,res)=>{
	try{

		subcatModel.find({role: 'Admin'}, (err, doc)=>{
			if(err || doc == null){

				console.log(err)
				response = common.generateResponse(400, true, 'Errr in displaying SubCategories', err)
				res.status(response.status).send(response)
			}
			else{

				if(doc){

					console.log(doc)
					response = common.generateResponse(200, false, 'Showing List of subcategories', doc)
					res.status(response.status).send(response)
				}
			}
		})
	}
	catch(e){
		console.log(e)
		response = common.generateResponse(500, true, 'Internal server Error', e)
		res.status(response.status).send(response)
	}
}


banner = (req,res)=>{

	try {

		let obj = {
			
			originalname:req.file.originalname,
			path:req.file.path.replace(/\s+/g, ''),
			mimetype:req.file.mimetype
		}

		// console.log('Request File',req.file)
		
		RoleRightModel.findOne({role:'Admin'}, (err,doc)=>{

			if(err || doc == null){

				response = common.generateResponse(500, true, 'Internal Server Error',e)
				return res.sendStatus(response.status).send(response)

			}else{


				const fs = require('fs')
				const path = require('path')
				sharp(path.join(__dirname, `../../public/${req.file.filename}`)).resize(1680, 320)
				.toFile(path.join(__dirname, `../../public/optimized/${req.file.filename}`))
				.then(data=>{

					console.log(data)
					let base64data = fs.readFileSync(path.join(__dirname, `../../public/optimized/${req.file.filename}`))
					.toString('base64')
				
					obj.base64 = base64data
					// console.log(obj)
					BannerModel.create(obj,(err, data)=>{
						if(err){

							console.log('Error in BannerModel',err)
							response = common.generateResponse(200, true, 'Only .png, .jpg and .jpeg format allowed!',err)
							return res.status(response.status).send(response)

						}else{

						// console.log('File uploaded', data)
							response = common.generateResponse(200, false, 'File Uploaded successfully',
							{AdminRoleRights:doc, image:data})
							return res.status(response.status).send(response)
						}
					})
				})
				
				
			}
		})
			
	}

	catch(e){
		console.log(e)
		response = common.generateResponse(500, true, 'Internal Server Error',e)
		return res.status(response.status).send(response)
	
	}
}


displayImages = (req,res)=>{

	try {

		BannerModel.find({role:'Admin'}, (err, doc)=>{

			if(err || doc==null){

				console.log(err)
				response = common.generateResponse(400, true, 'Doc not Found',err)
				return res.status(response.status).send(response)
			}

			else{

				if(doc){

					// console.log(doc)
					response = common.generateResponse(200, false, 'Data Found Successfully',doc)
					return res.status(response.status).send(response)
				}
				else{

					response = common.generateResponse(200, true, 'Only jpeg|jpg|png supported', doc)
					return res.status(response.status).send(response)
				}

			}

		})		
		
	}

	catch(e){

		console.log(e)
		response = common.generateResponse(500, true, 'Internal Server error', e)
		return res.status(response).send(response)
	}
}




module.exports = {
	roleRightCreation,
	getRoleRights,
	editMenus,
	deleteMenu,
	banner,
	displayImages,
	Addsubmenu,
	getSubMenu,
}

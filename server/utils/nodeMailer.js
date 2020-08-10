const nodemailer = require('nodemailer')

let sendMail = {

	createTransport(subject, msg){
		const transporter = nodemailer.createTransport({
			service:'gmail',
			auth:{
				user:'karandutta2011@gmail.com',
				pass:'J@cksrk567'
			}
		})

		let info = transporter.sendMail({
			from:'abc@gmail.com',
			to:'karandutta2011@gmail.com',
			subject: subject,
			html:msg
		})

		console.log("Message sent:", info.message);
	}
}

module.exports = sendMail


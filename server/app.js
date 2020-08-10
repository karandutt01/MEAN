const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const passport = require('passport')
const connectDb = require('./db/connect')

const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(cors())
app.use(passport.initialize())

app.use('/api', require('./CommonModule/routes/Register'))
app.use(require('./utils/tokenMiddleware'))


app.listen(3000, (err)=>{
	err ? console.log('Server not started',err) : console.log('Server Started..........')
	const auth = require('./CommonModule/controllers/auth')
	const Auth = new auth()
	Auth.findAdmin()
	
})
const mongoose = require('mongoose')
const connectionMongo = require('../utils/dbConnect').dbconfig
// const Grid = require('gridfs-stream')
// Grid.mongo = mongoose.mongo

mongoose.connect(connectionMongo,{useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{
	console.log('Database Connected.........')
}).catch(err=>{
	console.log('Database is not connected......', err)
})

module.exports = mongoose

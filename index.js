const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')
const app = express()
app.use(cors())
app.use(bodyParser.json())  // Put this way up or routers can't use it!

const productsRouter = require('./products/router')
app.use(productsRouter)
const usersRouter = require('./users/router')
app.use(usersRouter)

/* More or less equal to
app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*')
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
next()
})
*/



app.listen(4001, () => console.log('Express API listening on port 4001'))

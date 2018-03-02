const User = require('./model')
const Router = require('express').Router
const bcrypt = require('bcrypt')
const router = new Router()

  router.post('/users', (req, res) => {
      const user = {
      	email: req.body.email,
      	password: bcrypt.hashSync(req.body.password, 10)
      }

      User
        .create(user)
        .then(entity => {
        	res.send({
        		id: entity.id,
        		email: entity.email
        	})
        })
        .catch(err => {
        	console.error(err)
        	res.status(500).send({
        		message: 'Something went wrong'
        	})
        })
  })

module.exports = router

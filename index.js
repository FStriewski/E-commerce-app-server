const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')
const app = express()

app.use(cors())

/* More or less equal to
app.use(function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*')
res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
next()
})
*/


app.use(bodyParser.json())

app.listen(4001, () => console.log('Express API listening on port 4001'))



const Product = sequelize.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: Sequelize.STRING
}, {
  tableName: 'products',
  timestamps: false
})

//Product.findById(3).then(product => console.log(JSON.stringify(product)))


app.get('/products', (req, res) => {
  const products = Product
  .findAll()
  .then(products => {
    if(products){
      res.json(products)
    } else {
        res.status(404)
        res.json({ message: "Stuff not found"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500)
    res.json({message: "There was an error"})
  })
})


  app.get('/products/:id', (req, res) => {
    const products = Product
    .findById(req.params.id)
    .then(products => {
      if(products){
        res.json(products)
      } else {
          res.status(404)
          res.json({ message: "Stuff not found"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500)
      res.json({message: "There was an error"})
    })
  })

  app.post('/products', (req, res) => {
    const product = req.body
    console.log(product)
    // insert the new data into our database
    Product.create(product).then(entity => {
      // send back the 201 Created status and the entity
      res.status(201).send(entity)
    })
  })

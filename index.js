const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')
const app = express()

app.use(cors())
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
  // ... get the JSON data from the body
  // ... insert the new data into our database
})

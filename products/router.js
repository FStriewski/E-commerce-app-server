const Router = require('express').Router
const Product = require('./model')
const router = new Router()

   router.get('/products', (req, res) => {
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

  router.get('/products/:id', (req, res) => {
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

router.post('/products', (req, res) => {
    const product = req.body
    console.log(product)
    // insert the new data into our database
    Product.create(product).then(entity => {
      // send back the 201 Created status and the entity
      res.status(201).send(entity)
    })
  })

  router.put('/products/:id', (req, res) => {
    const productId = Number(req.params.id)
    const updates = req.body

    // find the product in the DB
    Product.findById(req.params.id)
      .then(entity => {
        // change the product and store in DB
        return entity.update(updates)
      })
      .then(final => {
        // respond with the changed product and status code 200 OK
        res.send(final)
      })
      .catch(error => {
        res.status(500).send({
          message: `Something went wrong`,
          error
        })
      })
  })


  router.delete('/products/:id', (req, res) => {
    const productId = Number(req.params.id)

      Product.findById(req.params.id)
      .then(entity => {
        // change the product and store in DB
        return entity.destroy()
      })
      .then(_ => {
        // respond with the changed product and status code 200 OK
        res.send({
          message: 'The product was deleted succesfully'
        })
      })
      .catch(error => {
        res.status(500).send({
          message: `Something went wrong`,
          error
        })
      })
})


module.exports = router

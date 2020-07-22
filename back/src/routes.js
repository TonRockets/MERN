const express = require('express');
const routes = express.Router();
const ProductController = require('./controllers/ProductController')

routes.get('/nomes', ProductController.index)
routes.get('/nomes', ProductController.show)
routes.post('/nomes', ProductController.store)
routes.put('/nomes/:id', ProductController.update)
routes.delete('/nomes/:id', ProductController.destroy)

module.exports = routes
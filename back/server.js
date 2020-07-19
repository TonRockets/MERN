const express = require('express');
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')
const app = express();

app.use(express.json())


//Conectando o DB
mongoose.connect('mongodb://localhost:27017/nodeapi', { useNewUrlParser: true, useUnifiedTopology: true })
requireDir('./src/models');

//Rotas
app.use(cors())
app.use('/api', require('./src/routes'))

//Servidor rodando na porta 3003
app.listen(3003, () => {
    console.log('Rodando na porta 3003')
})
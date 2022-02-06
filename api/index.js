const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/teste', (req, res) => res
  .status(200)
  .send({ mensagem: 'Boas-vindas à API' }))

app.listen(port, () => console.log(`Servidor está ouvindo na porta ${port}`))